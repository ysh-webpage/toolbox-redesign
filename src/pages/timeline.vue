<template>
    <Layout>
        <v-row>
            <v-col cols = 12 md = 6>
                <v-card title = 時間軸 subtitle = 進度完成器 class = 'ma-3' variant = tonal>
                    <template #text>
                        <v-hover v-for = 'i, j in f' :key = j>
                            <template #default = '{isHovering, props}'>
                                <v-card
                                    :id = '`task${j}`'
                                    class = test
                                    :class = 'isHovering ? `rmbg` : undefined'
                                    v-bind = props
                                    :color = 'isHovering ? `primary` : undefined'
                                    :title = i.title
                                    :subtitle = i.subtitle
                                >
                                    <v-progress-linear :indeterminate = 'i.progress ? false : true' v-model = i.progress />
                                    <div class = 'align-content-center progress'> {{ i.progress }} </div>
                                </v-card>
                            </template>
                        </v-hover>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </Layout>
</template>

<script lang = ts setup>
import Layout from '@/plugins/layout.vue';
import { $ } from 'jquery';
import { inject, onMounted, ref, watch, type Ref } from 'vue';

const f = ref([
    {
        title: '測試',
        subtitle: '測試測試',
        progress: 75,
        color: 'orange'
    }
])

const init = () => {
    for(var i = 0, len = f.value.length; i<len; i++) {
        $(`#task${i}`).css({
            'background': `linear-gradient(90deg, ${f.value[i]!.color} ${f.value[i]!.progress}%, white ${f.value[i]!.progress}%)`
        })
    }
}

const inited: Ref<boolean> = inject('inited')!;
const logined: Ref<boolean> = inject('logined')!;
const kick: Function = inject('kick')!;

watch(inited, (neu, alt) => {
    if(!neu) return;
    if(!logined.value) kick('請先登入');
    init();
})
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