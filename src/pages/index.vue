<template>
    <layout>
        <v-container>
            <dial />
        </v-container>
    </layout>
</template>

<script lang = ts setup>
// import $ from 'jquery'
// import M from 'materialize-css'

// import { useDisplay } from 'vuetify'
// import { animate, stagger, onScroll, text } from 'animejs';

import Dial from '@/components/dial.vue';
import Layout from '@/plugins/layout.vue';
</script>

<style>
* {
  transition: 1s all;
}
</style>