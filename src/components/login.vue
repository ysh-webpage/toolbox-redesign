<template>
    <v-card title = 登入 subtitle = '歡迎來到 HARC Wbox'>
        <template #text>
            <v-text-field variant = 'solo-inverted' label = 使用者名稱 prepend-icon = 'mdi-account-alert' v-model = username clearable />
            <v-text-field variant = 'solo-inverted' label = 密碼 prepend-icon = 'mdi-account-key' v-model = password type = password clearable />
            <v-card class = 'ma-3 text-center' title = 登入 variant = tonal @click = login v-ripple />
        </template>
    </v-card>
</template>

<script lang = 'ts' setup>
import { inject, ref } from 'vue';
import { $ } from 'jquery';

const username = ref('');
const password = ref('');

const account: {[id: string]: Function} = inject('account')!;
const error: Function = inject('error')!;

const login = () => {
    $.post('https://api.citrc.tw/wbox/login', {username, password}, (response) => {
        response = JSON.parse(response);
        if(!response.ok) {
            error(response.error);
            return;
        }
        account.login!(response.id);
    })
}
</script>