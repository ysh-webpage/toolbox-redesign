<template>
    <v-card :title = title subtitle = "歡迎來到 ysh's Toolbox" class = 'ma-3 elevate' v-ripple />
    <v-row>
        <v-col v-for = 'page in pages' :key = page.color cols = 12 md = 6 lg = 4>
            <v-hover>
                <template #default = '{isHovering, props}'>
                    <a :href = page.url>
                        <v-card
                            v-bind = props
                            variant = tonal
                            class = ma-3
                            
                            :title = page.name
                            :subtitle = page.description
                            :color = 'isHovering ? `primary` : page.color'

                            v-ripple
                        >
                            <template #prepend>
                                <v-icon :icon = '`mdi-${page.icon}`' />
                            </template>
                        </v-card>
                    </a>
                </template>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script lang = ts setup>
// import $ from 'jquery'
// import M from 'materialize-css'

// import { useDisplay } from 'vuetify'
// import { animate, stagger, onScroll, text } from 'animejs';

defineProps({
    title: {
        type: String,
        default: '您好'
    }
})

const pages = [
  {
    icon: 'bus',
    name: '台南市公車',
    url: 'tainan_bus',
    description: '台南市公車',
    color: 'teal'
  },
  {
    icon: 'railroad-light',
    name: '宿舍公車',
    url: 'ncku_bus',
    description: '通往宿舍的公車',
    color: 'grey'
  },
  {
    icon: 'school',
    name: 'MoodlAPI',
    url: 'moodlapi',
    description: 'Moodle ，但是好看多了',
    color: 'orange'
  },
  {
    icon: 'database-alert',
    name: 'NCKU Database',
    url: 'NCKU_database',
    description: 'ououo',
    color: 'purple'
  },
  {
    icon: 'chart-donut',
    name: 'NCKU Courseapi',
    url: 'NCKU_courseapi',
    description: '開發中',
    color: 'yellow'
  }
];
</script>

<style scoped>
.v-card-title {
    font-weight: 900 !important;
}
</style>