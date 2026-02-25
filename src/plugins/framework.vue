<template>
    <router-view />
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref } from 'vue';

    const logined = ref(false);
    const session = ref('');

    provide('session', session);
    provide('logined', logined);

    import $ from 'jquery';

    onMounted(() => {
        $.post('https://api.citrc.tw/echo', {
            'id': '123'
        }, (response) => {
            session.value = response;
            logined.value = true;
        })
    })
</script>