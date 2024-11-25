<template>
    <div :class="{'grid' : isGrid}" class="timer-inner-container">
            <TimerlistItem
                v-for="item in store.timers"
                :key="item.id"
                :item="item"
                :updateTimerList="updateTimerList"
                />
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
}

.timer-inner-container.grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, 200px);
}

.timer-inner-container a{
    max-width: 100%;
    padding: .8rem;
}
</style>