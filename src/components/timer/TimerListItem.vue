<template>
    <router-link :to="{name: 'timer-detail', params: {id: item.id}}">
        <ul class="list-item" :class="levelClass(item.level)">
            <li>{{ item.title }}</li>
            <li class="right-side">
                <div>{{ formatTime }}</div>
                <i v-if="!isRunning && !isStarted" @click="startRoutine" class="fa-solid fa-circle-play"></i>
                <div class="see-more" @click.stop.prevent>
                    <div class="icon" >
                        <i @click="isBoxOpen = !isBoxOpen" class="material-symbols-outlined">
                            more_horiz
                        </i>
                    </div>
                    <div :class="{'open' : isBoxOpen}" class="box">
                        <div class="inner">
                            <p @click="updateTimer(item.id)">타이머 수정</p>
                            <p @click="deleteTimer(item.id)">타이머 삭제</p>
                            <p>타이머 공유</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </router-link>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import PlayBtnIcon from '../icons/PlayBtnIcon.vue';
import { useTimerStore } from '@/stores/timer';
import { useRouter } from 'vue-router';

const props = defineProps({
    item : Object,
    updateTimerList : Function,
});

const store = useTimerStore();
const router = useRouter();

const isGrid = ref(false);

const isBoxOpen = ref(false);

const handleOutsideClick = (e) => {
  const seeMoreBox = document.querySelector('.see-more .box');
  if (seeMoreBox && !seeMoreBox.contains(e.target)) {
    isBoxOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});

//삭제
// const deleteTimer = (id) => {
//     console.log("확인1")
//     store.deleteTimer(id).then(()=>{
//         console.log("확인용2")
//         props.updateTimerList();
//     });
// };

const updateTimer = async (id) => {
    await store.getOneTimer(id);
    store.changeToEditMode();
    store.openModal();
};

const deleteTimer = (id) => {
    let confirmDelete = confirm("정말 삭제하시겠습니까?");
    if(confirmDelete){
        doDeleteTimer(id);
    }
};
const doDeleteTimer = async (id) => {
  try {
    await store.deleteTimer(id);  // 비동기적으로 삭제 후 목록 갱신
    console.log("타이머 삭제 완료");
    props.updateTimerList();  // 목록 갱신
  } catch (error) {
    console.error('타이머 삭제 실패:', error);
  }
};


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

const formatTime = computed(()=>{
    const time = props.item.totalRoutineTime;
    const min = Math.floor(time / 60);
    const sec = time % 60;

    const formatMin = min < 10 ? '0' + min : min;
    const formatSec = sec < 10 ? '0' + sec : sec;

    return `${formatMin}:${formatSec}`;
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
    background-color: #5FA3DA;
}

.list-item > *:first-child{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.54rem;
    min-height: fit-content;
    max-width: 100%;
}

.grid .list-item{
    height: 100%;
    min-height: 310px;
    flex-direction: column;
    justify-content: center;
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

.right-side{
    display: flex;
    align-items: center;
}
.right-side > * {
    margin: 0 1rem;
}

.right-side .fa-solid {
    font-size: 3rem;
}
.right-side > div:first-child {
    font-size: 3rem;
    font-weight: bold;
}

.grid .right-side {
    flex-direction: column;
}

.see-more{
    position: relative;
}
.see-more .icon {
    height: 100%;
    display: flex;
    align-items: center;
}
.see-more .box {
    display: none;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 12px);
    z-index: 1;
}
.see-more .box.open {
    display: block;
}
.see-more .box::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -12px);
    z-index: 1;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 12px solid #D9D9D9;
}
.see-more .box .inner {
    background-color: #D9D9D9;
    border-radius: 3px;
    padding: .67rem 0;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: .96rem;
    color: #000;
}
.see-more .box .inner > * {
    margin: .1rem 0;
    padding: .1rem;
    border-radius: 3px;
    transition: background-color .3s;
}
.see-more .box .inner > *:hover {
    background-color: rgba(0, 0, 0, .3);
}
</style>