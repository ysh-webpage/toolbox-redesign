<template>
    <v-card :title = 'index == null ? `新增` : `修改`' :subtitle = '`${index == null ? "新增" : "修改"}一項工作`' class = ma-3>
        <template #text>
            <v-text-field
                label = 名字
                variant = outlined
                v-model = task
            />
            <v-text-field
                label = 解釋
                variant = outlined
                v-model = subtitle
            />
            <v-slider v-model = progress />

            <Timeline_task :title = task :subtitle = 'subtitle || `這是接下來會長的樣子`' :progress = pre color = #66AAAA />

            <v-hover>
                <template #default = '{isHovering, props}'>
                    <v-card
                        v-bind = props
                        :title = 'index == null ? `新增!` : `修改!`'
                        class = 'text-center ma-3 glass evelate'
                        variant = tonal
                        :color = 'isHovering ? `primary` : undefined'
                        @click = submit
                        v-ripple
                    />
                </template>
            </v-hover>

            <v-hover v-if = 'index != null'>
                <template #default = '{isHovering, props}'>
                    <v-card
                        v-bind = props
                        title = 完成
                        class = 'text-center ma-3 glass evelate'
                        variant = tonal
                        :color = 'isHovering ? `red` : undefined'
                        @click = remove
                        v-ripple
                    />
                </template>
            </v-hover>
        </template>
    </v-card>
</template>

<script lang = ts setup>
import { computed, inject, ref, watch, type Ref } from 'vue';
import Timeline_task from './timeline_task.vue';

const {index} = defineProps<{
    index: number | null
}>();

const task: Ref<string> = ref('');
const subtitle: Ref<string> = ref('');
const progress: Ref<number> = ref(0);

const pre = computed(() => {
    return Math.floor(progress.value);
})

const emit = defineEmits(['submit']);
const info: Function = inject('info')!;

const remove = () => {
    if(index == null) return;
    var now = load();

    now.splice(index, 1);
    save(now);

    emit('submit');
    info('完成!');
}

const load = () => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

const save = (x: any) => {
    localStorage.setItem('tasks', JSON.stringify(x));
}

const submit = () => {
    var now = load();

    const ans = {
        title: task.value,
        subtitle: subtitle.value,
        progress: pre.value
    };

    if(index == null) now.push(ans);
    else now[index] = ans;

    save(now);
    task.value = subtitle.value = '';
    progress.value = 0;

    emit('submit');
    info((index == null ? '新增成功' : '修改成功'));
}

watch(() => index as Object, (neu, alt) => {
    if(neu == null) task.value = subtitle.value = '', progress.value = 0;
    else {
        const now = load()[index as number];
        task.value = now.title;
        subtitle.value = now.subtitle;
        progress.value = now.progress;
    }
})
</script>