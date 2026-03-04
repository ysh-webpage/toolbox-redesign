<template>
    <v-hover>
        <template #default = '{isHovering, props}'>
            <v-card
                class = ma-3
                :class = 'isHovering ? `rmbg` : undefined'
                v-bind = props
                :color = 'isHovering ? `primary` : undefined'
                :title = title
                :subtitle = subtitle
                :style = '`background: linear-gradient(90deg, ${color} ${progress}%, white ${progress}%)`'
                @click = "emit('click')"
            >
                <!-- <v-progress-linear :indeterminate = 'progress ? false : false' :model-value = progress /> -->
                <div class = 'align-content-center progress'> {{ progress }} </div>
            </v-card>
        </template>
    </v-hover>
</template>

<script lang = ts setup>

    const {
        title = '',
        subtitle = '',
        color = 'burlywood',
        progress = 0
    } = defineProps<{
        title: string,
        subtitle: string,
        color: string,
        progress: number
    }>();

    const emit = defineEmits(['click']);
</script>

<style scoped>
    .progress {
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 50px;
        font-weight: 700;
        text-align: right;
        height: 100%;
        width: 90%;
    }
    .rmbg {
        background: none !important;
        background-color: burlywood !important;
    }
</style>