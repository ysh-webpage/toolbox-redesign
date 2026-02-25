<template>
    <layout>
        <template #title>
            404
        </template>

        <v-container>
            <v-card
                title = 這裏鴨根沒這頁面
                subtitle = 🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆
                prepend-icon = 'mdi-truck-alert'
                class = 'text-center glass elevate ma-3'

                v-ripple
            />

            <div @mouseenter = 'show = true' @mouseleave = 'show = false' :class = 'show ? undefined : `blur`'>
                <dial title = '想念首頁了嗎' />
            </div>
        </v-container>
    </layout>
</template>

<script lang = 'ts' setup>
import Layout from '@/plugins/layout.vue';
import dial from '@/components/dial.vue'

import { ref } from 'vue';

const show = ref(false);
</script>

<style scoped>
    .blur {
        filter: blur(50px);
    }
</style>