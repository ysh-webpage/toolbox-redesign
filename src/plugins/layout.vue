<template>
    <v-app>
        <v-app-bar
            color = grey
            class = elevate
            scroll-behavior = 'collapse'
            elevate = 3

            rounded
        >
            <template #prepend>
                <v-app-bar-nav-icon>
                    <a class = 'nodeco' href = '/'><v-icon class = ma-1> fa-solid mdi-toolbox </v-icon></a>
                </v-app-bar-nav-icon>
                <v-app-bar-title>
                    <a class = 'nodeco' href = '/'>
                        <slot name = 'title'>
                            {{ title }}
                        </slot>
                    </a>
                </v-app-bar-title>
            </template>

            <template #append>
                <v-hover>
                    <template #default = '{isHovering, props}'>
                        <a href = '/login' class = 'd-flex align-center nodeco'>
                            <v-card variant = plain class = 'd-flex align-center' v-ripple>
                                <b> 登入 </b>
                                <v-icon class = ma-2> mdi-login </v-icon>
                            </v-card>
                        </a>
                    </template>
                </v-hover>
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
.nodeco {
    text-decoration: none !important;
    color: inherit;
}
</style>