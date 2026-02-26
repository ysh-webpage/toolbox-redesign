<template>
    <v-snackbar-queue v-model = 'toast' total-visible = 5 />
    <router-view />
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref, type Ref } from 'vue';
    
    // General function
    const toast: Ref<{[id: string]: any}[]> = ref([]);

    const error = (error: string) => {
        toast.value.push({
            text: error,
            prependIcon: 'mdi-alert',
            color: 'pink',
            timer: 'bottom'
        })
    }

    const info = (x: string) => {
        toast.value.push({
            text: x,
            prependIcon: 'mdi-info',
            color: 'teal',
            timer: 'bottom'
        })
    }
    
    provide('error', error);
    provide('toast', toast);

    // login session related
    const logined = ref(false);
    const session: Ref<string | null> = ref('');

    provide('session', session);
    provide('logined', logined);

    const logout = () => {
        localStorage.removeItem('session');
        $.post('//api.citrc.tw/wbox/logout', {
            id: session
        }, () => {
            info('登出成功');
            init();
        })
    }

    const login = (session: string) => {
        if(logined) logout();
        localStorage.setItem('session', session);
        info('登入成功');
        init();
    }

    const account = ref({
        logout, login
    })

    provide('account', account);

    const init = () => {
        session.value = localStorage.getItem('session');
        if(session.value) $.post('https://api.citrc.tw/wbox/whoami', {
                                'id': session
                            }, (response) => {
                                response = JSON.parse(response);
                                if(!response['ok']) error(response.error);
                                console.log(response);
                            })
    }
    
    import $ from 'jquery';

    onMounted(() => {
        init();
    })
</script>