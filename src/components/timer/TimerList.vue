<template>
    <div :class="{'grid' : isGrid && (store.timers && store.timers.length !== 0)}" class="timer-inner-container">
            <TimerlistItem
                v-for="item in store.timers"
                :key="item.id"
                :item="item"
                :updateTimerList="updateTimerList"
                :isGrid="isGrid"
                />
            <div v-if="!store.timers || store.timers.length === 0" class="no-timer">No Timer</div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTimerStore } from '@/stores/timer';
import TimerlistItem from './TimerlistItem.vue';

defineProps({
    isGrid: Boolean,
});

const store = useTimerStore();

const route = useRoute();

onMounted(()=>{
    store.getTimerList();
});

onBeforeUnmount(()=> {
    store.initTimer();
})

const updateTimerList = () => {
    store.getTimerList();
};

</script>

<style scoped>
.timer-inner-container{
    width: 100%;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 2rem 1.6rem;
    min-height: 200px;
}

.timer-inner-container.grid{
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
}

.timer-inner-container a{
    max-width: 100%;
    padding: .8rem;
}

.no-timer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 1150px) {
    .timer-inner-container.grid{
        grid-template-columns: repeat(2, 50%);
    }
}
@media (max-width: 620px) {
    .timer-inner-container.grid{
        grid-template-columns: repeat(1, 100%);
    }
}
</style>