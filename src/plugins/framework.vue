<template>
    <v-snackbar-queue v-model = 'toast' total-visible = 5 />
    <router-view />
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref, type Ref } from 'vue';

    // Properties for other general modules
    const loading = ref(false);
    provide('loading', loading);
    
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
    const username: Ref<string | null> = ref('');

    provide('session', session);
    provide('logined', logined);
    provide('username', username);

    const logout = () => {
        // console.log('logout');
        localStorage.removeItem('session');
        $.post('https://api.citrc.tw/wbox/logout', {
            id: session
        }, () => {
            info('登出成功');
            init();
        })
    }

    const login = (session: string) => {
        // console.log('login');
        if(logined.value) logout();
        localStorage.setItem('session', session);
        info('登入成功');
        init();
    }

    const account = {
        logout: logout,
        login: login
    }

    provide('account', account);

    const init = () => {
        // console.log('init');
        session.value = localStorage.getItem('session');
        logined.value = false;
        if(session.value) $.post('https://api.citrc.tw/wbox/whoami', {
                                'id': session.value
                            }, (response) => {
                                response = JSON.parse(response);
                                if(!response['ok']) {
                                    error(response.error);
                                    return;
                                }
                                logined.value = true;
                                username.value = response.data;
                            })
    }
    
    import $ from 'jquery';

    onMounted(() => {
        init();
    })
</script>