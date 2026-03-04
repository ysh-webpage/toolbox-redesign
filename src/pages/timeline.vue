<template>
    <Layout>
        <v-row>
            <v-col cols = 12 md = 6>
                <v-card title = 時間軸 subtitle = 進度完成器 class = 'ma-3' variant = text>
                    <template #text>
                        <template v-for = 'i, j in f'>
                            <Timeline_task :title = i.title :subtitle = i.subtitle :color = i.color :progress = i.progress @click = 'index = j' />
                        </template>
                    </template>
                    <v-card title = 新增 subtitle = 寫個新東西吧 variant = tonal class = 'ma-3 text-center' color = orange @click = 'index = null' prepend-icon = 'mdi-bell-plus' />
                </v-card>
            </v-col>
            <v-col cols = 12 md = 6>
                <Timeline_save @submit = init :index = index />
            </v-col>
        </v-row>
    </Layout>
</template>

<script lang = ts setup>
import Timeline_save from '@/components/timeline_save.vue';
import Timeline_task from '@/components/timeline_task.vue';
import Layout from '@/plugins/layout.vue';
import { inject, onMounted, ref, watch, type Ref } from 'vue';

interface task {
    title: string,
    subtitle: string,
    color: string,
    progress: number
}

const f: Ref<task[]> = ref([])!;
const index: Ref<number | null> = ref(null);

const inited: Ref<boolean> = inject('inited')!;
const logined: Ref<boolean> = inject('logined')!;
const kick: Function = inject('kick')!;

watch(inited, (neu, alt) => {
    if(!neu) return;
    if(!logined.value) kick('請先登入');
})

const init = () => {
    f.value = JSON.parse((localStorage.getItem('tasks') || '[]'));
    index.value = null;
}

onMounted(init);
</script>