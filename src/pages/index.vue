<template>
    <layout>
        <v-container>
            <dial :title = 'logined ? `您好，${username}` : undefined' />
        </v-container>
    </layout>
</template>

<script lang = ts setup>
import Dial from '@/components/dial.vue';
import Layout from '@/plugins/layout.vue';
import { inject } from 'vue';

const logined = inject('logined');
const username = inject('username');
</script>

<style>
* {
    transition: .3s all;
}
</style>