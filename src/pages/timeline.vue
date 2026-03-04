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
                <v-switch v-model = online v-if = logined inset label = 同步 />
                <Timeline_save @submit = submit :index = index :online = online />
            </v-col>
        </v-row>
    </Layout>
</template>

<script lang = ts setup>
import Timeline_save from '@/components/timeline_save.vue';
import Timeline_task from '@/components/timeline_task.vue';
import Layout from '@/plugins/layout.vue';
import { $ } from 'jquery';
import { inject, onMounted, ref, watch, type Ref } from 'vue';

interface task {
    title: string,
    subtitle: string,
    color: string,
    progress: number
}

const f: Ref<task[]> = ref([])!;
const index: Ref<number | null> = ref(null);
const online: Ref<boolean> = ref(false);

const inited: Ref<boolean> = inject('inited')!;
const logined: Ref<boolean> = inject('logined')!;
const kick: Function = inject('kick')!;

// Only for online version
const session: Ref<string> = inject('session')!;
const error: Function = inject('error')!;
const info: Function = inject('info')!;
const loading: Ref<boolean> = inject('loading')!;

watch(inited, (neu, alt) => {
    if(!neu) return;
    if(!logined.value) kick('請先登入');
    online.value = (localStorage.getItem('timeline.online') == '1') || false;
    init();
})

watch(online, (neu, alt) => {
    init();
    localStorage.setItem('timeline.online', (neu ? '1' : '0'));
})

const load = () => {
    f.value = JSON.parse((localStorage.getItem('tasks') || '[]'));
    index.value = null;
}

const submit = () => {
    load();

    if(online.value) {
        loading.value = true;
        $.ajax({
            url: 'https://api.citrc.tw/timeline/sync',
            timeout: 10000,
            method: 'POST',
            data: {
                id: session.value,
                data: JSON.stringify(f.value)
            }
        }).done((response) => {
            if(!response.ok) error(response.error);
            else info('同步成功');
            init();
        }).fail(() => {
            error('同步失敗');
        }).always(() => {
            loading.value = false;
        })
    }
    else init();
}

const init = () => {
    load();

    // Online Version
    if(!inited.value) return;
    if(online.value) {
        loading.value = true;
        $.ajax({
            url: 'https://api.citrc.tw/timeline/get',
            timeout: 5000,
            method: 'POST',
            data: {
                id: session.value
            }
        }).done((response) => {
            console.log(response);
            if(!response.ok) error(response.error);
            else {
                f.value = response.data;
                localStorage.setItem('tasks', JSON.stringify(f.value));
            }
        }).fail(() => {
            error('連線失敗，正在檢視本地版');
            online.value = false;
        }).always(() => {
            loading.value = false;
        })
    }
}

onMounted(init);
</script>