<template>
    <layout>
        <v-row justify = center>
            <v-col cols = 8>
                <v-text-field class = ma-3 v-model = search label = 尋 @keydown.enter = submit />
                <v-card class = 'ma-3 text-center' title = 找人 prepend-icon = 'mdi-shield-search' v-ripple @click = submit @dblclick = gp />
            </v-col>
            <v-data-table-server
                :items-length = n
                :headers = header
                :items = data
                :class = 'loading ? `blur` : undefined'
                :group-by = group

                @update:options = submit
            >
                <template #item.profileimageurlsmall = '{value}'>
                    <v-img :src = value max-height = 50px />
                </template>
                <template #item.profileimageurl = '{value}'>
                    <v-img :src = value max-height = 50px />
                </template>
            </v-data-table-server>
            <div id = loading_cover v-if = loading class = 'align-content-center text-center'>
                <v-progress-circular size = 50 class = ma-3 indeterminate /><br>
                <b> 載入中 </b>
            </div>
        </v-row>
    </layout>
</template>

<script lang="ts" setup>
import Layout from '@/plugins/layout.vue';
import { $ } from 'jquery';
import { inject, ref, watch, type Ref } from 'vue';

const inited: Ref<boolean> = inject('inited')!;
const session: Ref<String> = inject('session')!;
const logined: Ref<boolean> = inject('logined')!;
const account: {[id: string]: Function} = inject('account')!;

// const info: Function = inject('info')!;
const error: Function = inject('error')!;
const kick: Function = inject('kick')!;
const loading: Ref<boolean> = inject('loading')!;

const search = ref('');
const page = ref(0);
const sort = ref('');
const data = ref([]);
const header: Ref<{[id: string]: string}[]> = ref([]);
const group: Ref<{key: string, order: 'asc' | 'desc'}[]> = ref([]);
const n: Ref<number> = ref(0);

const gp = () => {
    const now: {key: string, order: 'asc' | 'desc'}[] = [{key: 'department', order: 'asc'}];
    if(group.value.length == 0) group.value = now;
    else group.value = [];
}

const names: {[id: string]: string} = {
    'id': '編號',
    'fullname': '名字',
    'department': '系所',
    'idnumber': '學號',
    // 'profileimageurlsmall': 'profileimageurlsmall',
    'profileimageurl': '頭像',
    'search_quote': '批次',
    '宿舍': '宿舍',
    // '宿舍候補序號': '宿舍候補序號',
    // 'old_dorm': 'old_dorm'
};
watch(inited, (neu, alt) => {
    // console.log(alt, neu, logined.value);
    if(!neu) return;
    if(!logined.value) kick('請先登入');
})

const submit = (x: {[id: string]: any} | undefined) => {
    if(!inited.value) return;
    if(x?.page != undefined) page.value = x.page;
    else page.value = 0;

    if((x?.sortBy || [0])[0]?.key != undefined) sort.value = x?.sortBy[0]?.key;
    
    loading.value = true;
    $.ajax({
        url: 'https://api.citrc.tw/NCKU/whoisthis',
        method: 'POST',
        timeout: 5000,
        data: {
            id: session.value,
            key: search.value,
            n: page.value,
            sort: sort.value
        }
    }).done((response) => {
        response = JSON.parse(response);
        if(!response.ok) {
            error(response.error);
            if(response.data?.logout) {
                account.logout!();
                location.href = '/';
            }
        }
        data.value = response.data.result;
        if(data.value.length > 0) header.value = Object.keys(data.value[0]!).filter((x) => (x in names)).map((x) => {return {
            title: names[x] || x,
            key: x,
            align: 'start'
        }});
        n.value = (response.data.pages + 1) * 100;
    }).fail(() => {
        error('請求失敗')
    }).always(() => {
        loading.value = false;
    })
}
</script>

<style>
.blur {
    filter: blur(10px);
}
#loading_cover {
    position: fixed;
    height: 30vh;
    width: 30vw;
    top: 35vh;
    left: 35vw;
    z-index: 5;
    color: black;
    font-weight: 900;
}
</style>