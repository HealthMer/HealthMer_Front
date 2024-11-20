<template>
    <router-link :to="{name: 'timer-detail', params: {id: item.id}}">
        <ul class="list-item" :class="levelClass(item.level)">
            <li>{{ item.title }}</li>
            <li>
                <span>{{ totalTime }}</span>
                <PlayBtnIcon />
                <span>...</span>
                
            </li>
        </ul>
    </router-link>
</template>

<script setup>
import { ref, computed } from 'vue';
import PlayBtnIcon from '../icons/PlayBtnIcon.vue';

defineProps({
    item : Object,
});

const isGrid = ref(false);

const levelClass = (level) => {
    switch(level){
        case 1:
            return "level-1";
        case 2:
            return "level-2";
        case 3:
            return 'level-3';
        case 4:
            return 'level-4';
        case 5:
            return 'level-5';
        default:
            return '';
    }
};

//임시 데이터
const routines = ref([
    {
    id : 1,
    timerInfoId : 1,
    name : '루틴 1',
    time : 6000,
    isRest : false,
    },
    {
    id : 2,
    timerInfoId : 1,
    name : '루틴 2',
    time : 3000,
    isRest : true,
    },
    {
    id : 3,
    timerInfoId : 1,
    name : '루틴 3',
    time : 7000,
    isRest : false,
    },
]);

const totalTime = computed(()=>{
    const totalMiliTime = routines.value.reduce((sum, routine) => sum + routine.time, 0);

    console.log(totalMiliTime);

    let min = Math.floor(totalMiliTime / 60000);
    const sec = Math.floor((totalMiliTime % 60000) / 1000);

    if(min === 0){
        min = '00';
    }
    return `${min}:${sec}`;
});

</script>

<style scoped>

.list-item {
    width: 100%;
    min-height: 100px;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    border-radius: 30px;
}

.grid .list-item{
    height: 100%;
}
/* 이후 색약 고려하기 */
.level-1{
    background-color: #5FA3DA;
}
.level-2{
    background-color: #5FDAA3;
}
.level-3{
    background-color: #EFCE4B;
}
.level-4{
    background-color: #F1874E;
}
.level-5{
    background-color: #C34143;
}
</style>