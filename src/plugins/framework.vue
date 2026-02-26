<template>
    <v-snackbar-queue v-model = 'toast' total-visible = 5 />
    <router-view />
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref, type Ref } from 'vue';

    const logined = ref(false);
    const session: Ref<string | null> = ref('');
    const toast: Ref<{[id: string]: any}[]> = ref([]);

    provide('session', session);
    provide('logined', logined);
    provide('toast', toast);
    
    import $ from 'jquery';
    
    const error = (error: string) => {
        toast.value.push({
            text: error,
            prependIcon: 'mdi-alert',
            color: 'pink',
            timer: 'bottom'
        })
    }

    provide('error', error);
    
    onMounted(() => {
        session.value = localStorage.getItem('session');
        if(session.value) $.post('https://api.citrc.tw/wbox/whoami', {
                                'id': session
                            }, (response) => {
                                response = JSON.parse(response);
                                if(!response['ok']) error(response.error);
                                console.log(response);
                            })
    })
</script>