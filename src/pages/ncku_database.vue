<template>
    <layout>
        <v-row justify = center>
            <v-col cols = 8>
                <v-text-field class = ma-3 v-model = search label = 尋 />
                <v-card class = 'ma-3 text-center' title = 找人 prepend-icon = 'mdi-shield-search' v-ripple @click = submit />
            </v-col>
        </v-row>
        <v-data-table-server
            :headers = header
            :items = data
        />
    </layout>
</template>

<script lang="ts" setup>
import Layout from '@/plugins/layout.vue';
import { $ } from 'jquery';
import { inject, ref, type Ref } from 'vue';

const session: Ref<String> = inject('session')!;
const logined: Ref<boolean> = inject('logined')!;
const account: {[id: string]: Function} = inject('account')!;

const info: Function = inject('info')!;
const error: Function = inject('error')!;
const loading: Ref<boolean> = inject('loading')!;

const search = ref('');
const page = ref(0);
const sort = ref('');
const data = ref([]);
const header: Ref<{[id: string]: string}[]> = ref([]);

const submit = () => {
    loading.value = true;
    $.ajax({
        url: 'https://api.citrc.tw/NCKU/whoisthis',
        method: 'POST',
        data: {
            id: session.value,
            key: search.value,
            n: page.value,
            sort: sort.value,
            timeout: 5000
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
        if(data.value.length > 0) header.value = Object.keys(data.value[0]!).map((x) => {return {
            title: x,
            key: x,
            align: 'start'
        }});
    }).fail(() => {
        error('請求失敗')
    }).always(() => {
        loading.value = false;
    })
}
</script>

<style>
</style>