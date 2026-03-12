<template>
    <Layout>
        <v-row>
            <v-col cols = 12 md = 3 v-for = "i, j in route" :key = j>
                <v-card
                    :title = i.name
                    :subtitle = "isint(i.time) ? `${i.time} Minutes` : i.time"
                />
            </v-col>
        </v-row>
    </Layout>
</template>

<script lang = ts setup>
import Layout from '@/plugins/layout.vue';
import { $ } from 'jquery';
import { inject, onMounted, ref, watch, type Ref } from 'vue';

interface bus {
    name: string,
    id: number,
    time: string,
    from: string,
    to: string,
    rev: boolean,
    stop: string
};

const rev: Ref<boolean> = ref(true);
const loading: Ref<boolean> = inject("loading")!;
const route: Ref<bus[]> = ref([]);
var route_history = new Set();
var to = JSON.parse('{"2101":"0","10450":"0","10451":"1","1070":"0","1077":"1","1117":"1","1412":"0","1602":"1","2902":"0","10019":"1","10162":"0"}');

const check = () => {
    if(rev) {
        get_stop('台南火車站(南站)',1);
        get_stop('台南火車站(北站)',1);
        get_stop('臺南火車站(成功路A)',1);
        get_stop('臺南火車站(成功路B)',1);
        get_stop('臺南火車站(中山路C)',1);
        get_stop('臺南火車站(中山路D)',1);
        get_stop('香格里拉飯店',1);
    } else {
        get_stop('成大醫院(小東路)');
        get_stop('長榮小東路口');
        get_stop('東興里');
    }
}

onMounted(check);
watch(rev, (neu, alt) => {
    check();
})
setInterval(() => {
    check();
}, 10000);

const get_stop = (name: string, rev: boolean | number = false, key = '') => {
    if(rev == 1) rev = true;
    else if(rev == 0) rev = false;

    loading.value = true;
    location.href = '#routes';
    var url = 'https://2384.tainan.gov.tw/NewTNBusAPI_V2/API/CrossRoutesV2.ashx'
    $.post(url, {stopnamecht: name}, (data) => {
    // M.toast({html: JSON.stringify(data)});
    // route = [];
    for(var now of data) {
        for(var i of now['info']) {
        if(route_history.has(i?.RouteName)) continue
        if(to[i?.RouteID] == undefined) continue
        if((to[i?.RouteID] != i.GoBack) !== (rev)) continue
        // M.toast({html: JSON.stringify([to[i?.RouteID], i.GoBack])})
        route.value.push({name: i?.RouteName, id: i?.RouteID, time: i?.Time, from: i?.Dept, to: i?.Dest, rev: i?.GoBack, stop: name});
        route_history.add(i?.RouteName);
        }
    }
    // M.toast({html: JSON.stringify(route_history)});
    route.value.sort()
    route.value.sort((a,b) => {
        // M.toast({html: a?.time + ' ' + b?.time})
        var l = a?.time,r = b?.time;
        if(a?.time == '即將進站') l = "-10000";
        else if(!isint(a?.time)) l = "10000";
        if(b?.time == '即將進站') r = "-10000";
        else if(!isint(b?.time)) r = "10000";
        // M.toast({html: l + ' ' + r})
        return (parseInt(l) - parseInt(r));
    })
    loading.value = false;
})
}
const isint = (x: string) => {
    const mask = /-?[1-9]\d*/
    var ans = x.match(mask);
    if(!ans) return false;
    return ans[0] == x;
};
</script>