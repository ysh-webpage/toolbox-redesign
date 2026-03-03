<template>
    <Layout>
        <v-container>
            <Login />
        </v-container>
    </Layout>
</template>

<script lang = 'ts' setup>
import Login from '@/components/login.vue';
import Layout from '@/plugins/layout.vue';
import { inject, watch, type Ref } from 'vue';

const inited: Ref<boolean> = inject('inited')!;
const logined: Ref<boolean> = inject('logined')!;
const kick: Function = inject('kick')!;

watch(inited, (neu, alt) => {
    if(!neu) return;
    if(logined.value) kick('你已經登入了');
})
</script>
