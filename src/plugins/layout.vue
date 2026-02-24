<template>
    <v-app>
        <v-app-bar
            color = grey
            class = a-3
            scroll-behavior = 'collapse'
            elevate = 3

            rounded
        >
            <template #prepend>
                <v-app-bar-nav-icon>
                    <v-icon class = ma-1> fa-solid mdi-toolbox </v-icon>
                </v-app-bar-nav-icon>
                <v-app-bar-title>
                    <slot name = 'title'>
                        {{ title }}
                    </slot>
                </v-app-bar-title>
            </template>
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang = ts setup>
// import $ from 'jquery'
// import M from 'materialize-css'

// import { useDisplay } from 'vuetify'
// import { animate, stagger, onScroll, text } from 'animejs';
// import { onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: "ysh's toolbox"
    }
})
</script>

<style>
* {
  transition: 1s all;
}
body {
  background-color: white;
}
.v-card-title {
    font-weight: 900 !important;
}
</style>