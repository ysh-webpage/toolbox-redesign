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
                class = 'text-center glass elevate'

                v-ripple
            />
        </v-container>
    </layout>
</template>

<script lang = 'ts' setup>
import Layout from '@/plugins/layout.vue';


</script>