<template>
    <div class="timer-inner-container">
            <TimerlistItem v-for="item in items" :key="item.id" :item="item"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import TimerlistItem from './TimerlistItem.vue';


const items = ref([
    {
    id : 1,
    userId : 1,
    title : '제목 1',
    viewsCount : 2,
    completeCount : 3,
    level : 1,
    created_at : 2024-11-14,
    },
    {
    id : 2,
    userId : 1,
    title : '제목 2',
    viewsCount : 2,
    completeCount : 3,
    level : 1,
    created_at : 2024-11-14,
    },
])


</script>

<style scoped>
.timer-inner-container{
    width: 100%;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 2rem 1.6rem;
}

</style>