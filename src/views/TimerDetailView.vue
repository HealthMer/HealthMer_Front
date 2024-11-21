<template>
    <minimal-layout>
      <div class="detail">
        <div class="back" @click="goBack">
          <-
        </div>

        <div>
          <p>{{time}}</p>
          <button @click="startTimer">시작</button>
          <button @click="pauseTimer">정지</button>
        </div>

        <div class="timer">
          <div class="current">
            <p class="time">{{ currFormatTime }}</p>
          </div>
          <div class="next">
            <p>next routine</p>
            <p class="time">{{ nextFormatTime }}</p>
          </div>
        </div>

        <div class="timer-control">
          <p class="line"></p>
          <p class="play">
            <PlayBtnIcon />
          </p>
          <p class="line"></p>
          <p class="volume on">
            <span class="material-symbols-outlined">volume_up</span>
          </p>
        </div>
      </div>
    </minimal-layout>
</template>
  
<script setup>
import MinimalLayout from '@/layouts/MinimalLayout.vue';
import PlayBtnIcon from '@/components/icons/PlayBtnIcon.vue';
import { useRoute, useRouter } from 'vue-router';
import { useHistoryStore } from '@/stores/history';
import { useTimerStore } from '@/stores/timer';
import { ref, computed, onMounted, watch } from 'vue';


const route = useRoute();
const router = useRouter();
const historyStore = useHistoryStore();
const timerStore = useTimerStore();

const routine = computed(()=>{
  return timerStore.routine;
});

const currRoutineIdx = ref(0);

const currRoutine = computed(()=>{
  const result = routine.value[currRoutineIdx.value];
  return result ? result : {};
});
const nextRoutine = computed(()=>{
  const result = routine.value[currRoutineIdx.value + 1];
  return result ? result : {};
});

//타이머
let timerInterval = null;
const time = ref(0); //타이머 시간
const isRunning = ref(false); //타이머가 시작됐는가
const isPaused = ref(false); //타이머가 일시정지됐는가

//타이머 시작
const startTimer = () => {
  if(isRunning.value || currRoutineIdx.value >= routine.value.length) return;
  isRunning.value = true;
  isPaused.value = false;
  startRoutineTimer(currRoutine.value.time);
};

const startRoutineTimer = (routineTime) => {
  time.value = routineTime;
  timerInterval = setInterval(()=>{
    if(time.value > 0){
      time.value--;
    }else{
      clearInterval(timerInterval);
      currRoutineIdx.value++;
      if(currRoutineIdx.value <= routine.value.length){
        startRoutineTimer(currRoutine.value.time);
      }else{
        resetTimer();
      }
    }
  },1000);
};

// 타이머 일시정지
const pauseTimer = () => {
  clearInterval(timerInterval); // 타이머 정지
  isRunning.value = false;
  isPaused.value = true;
};

// 타이머 재개
const resumeTimer = () => {
  if (isRunning.value || currRoutineIdx.value >= routine.value.length) return; // 이미 실행 중이거나 모든 루틴이 끝난 경우
  isRunning.value = true;
  isPaused.value = false;
  startRoutineTimer(currentRoutine.value.time); // 일시정지된 타이머 재개
};

// 타이머 리셋
const resetTimer = () => {
  clearInterval(timerInterval)  // 타이머 정지
  time.value = 0  // 시간 초기화
  isRunning.value = false
  isPaused.value = false
  currRoutineIdx.value = 0  // 루틴 인덱스 리셋
}

const currFormatTime = computed(() => {
  const min = String(Math.floor(time.value / 60)).padStart(2, '0')
  const sec = String(time.value % 60).padStart(2, '0')
  return `${min}:${sec}`
})

const nextFormatTime = computed(() => {
  const nextTime = nextRoutine.value.time;
  if(!nextTime) return null;
  const min = String(Math.floor(nextTime / 60)).padStart(2, '0')
  const sec = String(nextTime % 60).padStart(2, '0')
  return `${min}:${sec}`
})

// const currFormatTime = computed(()=>{
//     const min = Math.floor(time / 60);
//     const sec = time % 60;

//     const formatMin = min < 10 ? '0' + min : min;
//     const formatSec = sec < 10 ? '0' + sec : sec;

//     return `${formatMin}:${formatSec}`;
// });


const goBack = () => {
  const prevUrl = historyStore.getPrevUrl();

  if (prevUrl !== '/') {
    router.back();
  } else {
    router.push({name: 'main'});
  }
};

onMounted(()=>{
  timerStore.getRoutine(route.params.id);
  startTimer();
});

</script>

<style scoped>
.back {
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(20px, 20px);
}
.timer {
  display: flex;
  font-weight: bold;
}
.timer .current {
  font-size: 18vw;
}
.timer .next {
  opacity: .7;
  line-height: 6.5vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 11rem;
}
.timer .next p:first-child {
  font-size: 4.45vw;
}
.timer .next p:last-child {
  font-size: 10vw;
}

.timer-control{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-control * {
  margin: 0 1vw;
}

.timer-control .line {
  width: 40%;
  height: 1px;
  background-color: var(--border-color);
}

.timer-control .volume{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>