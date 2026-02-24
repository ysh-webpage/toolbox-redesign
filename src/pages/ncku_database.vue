<template>
    <layout>
        <v-row>
            <v-col>
                <v-text-field class = ma-3 v-model = search />
                <v-card class = 'ma-3 text-center' title = 搜尋 prepend-icon = 'mdi-search' v-ripple />
            </v-col>
        </v-row>
    </layout>
</template>

<script lang="ts" setup>
import Layout from '@/plugins/layout.vue';
import { ref } from 'vue';

const search = ref('');
</script>

<style>
</style>