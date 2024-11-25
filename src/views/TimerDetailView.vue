<template>
    <minimal-layout>
      <div class="detail">
        <div class="head">
          <i @click="goBack" class="fa-solid fa-arrow-left"></i>
          <span v-if="currRoutineIdx !== null"> {{ routine[currRoutineIdx].name }}</span>
        </div>

        <div class="timer">
          <div class="progress-background" :style="progressBackgroundStyle"></div>
          <div class="current">
            <p class="time">{{ currFormatTime }}</p>
          </div>
          <div class="next">
            <p>next routine</p>
            <p v-if="currRoutineIdx !== null && currRoutineIdx < routine.length - 1">
             {{ nextFormatTime }}
            </p>
            <p v-else :class="{'no-routine' : currRoutineIdx === null || currRoutineIdx >= routine.length - 1}">
              No routine
            </p>
          </div>
        </div>

        <div class="timer-control">
          <p class="line"></p>
          <p class="play">
            <i v-if="!isRunning && !isStarted" @click="startRoutine" class="fa-solid fa-circle-play"></i>
            <i v-if="!isRunning && isStarted" @click="resumeTimer" class="fa-solid fa-circle-play"></i>
            <i v-if="isRunning" @click="pauseTimer" class="fa-solid fa-circle-pause"></i>
          </p>
          <p class="line"></p>
          <p @click="toggleMute" class="volume on">
            <i v-if="isMute" class="fa-solid fa-volume-high"></i>
            <i v-else class="fa-solid fa-volume-xmark"></i>
          </p>
        </div>
      </div>
    </minimal-layout>
</template>

<script setup>
import MinimalLayout from '@/layouts/MinimalLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { useHistoryStore } from '@/stores/history';
import { useTimerStore } from '@/stores/timer';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const historyStore = useHistoryStore();
const timerStore = useTimerStore();

// routine 데이터 가져오기
const id = route.params.id;
timerStore.getRoutine(id);

const routine = computed(() => timerStore.routine);

// 타이머용 변수
const currRoutineIdx = ref(null);
const timeLeft = ref(0);
const timerInterval = ref(null);
const isStarted = ref(false);
const isRunning = ref(false);
const isMute = ref(false);

// routine 데이터 로드 후 타이머 초기화
watch(routine, (newRoutine) => {
  if (newRoutine.length > 0) {
    timeLeft.value = newRoutine[0].time;
    currRoutineIdx.value = 0;
  }
}, { immediate: true });

// 음성 on/off
const toggleMute = () => {
  isMute.value = !isMute.value;
};

// 분 : 초 형식으로 시간 변환
const currFormatTime = computed(() => {
  const min = String(Math.floor(timeLeft.value / 60)).padStart(2, '0');
  const sec = String(timeLeft.value % 60).padStart(2, '0');
  return `${min}:${sec}`;
});

const nextFormatTime = computed(() => {
  if (currRoutineIdx.value !== null && currRoutineIdx.value < routine.value.length - 1) {
    const nextRoutine = routine.value[currRoutineIdx.value + 1];
    const min = String(Math.floor(nextRoutine.time / 60)).padStart(2, '0');
    const sec = String(nextRoutine.time % 60).padStart(2, '0');
    return `${min}:${sec}`;
  }
  return '';
});

// 최초 루틴 시작
const startRoutine = () => {
  if (routine.value.length === 0) {
    alert('루틴이 비어 있습니다.');
    return;
  }
  currRoutineIdx.value = 0;
  isStarted.value = true;
  startTimer();
};

// 타이머 재생
const startTimer = () => {
  if (currRoutineIdx.value === null || currRoutineIdx.value >= routine.value.length) return;

  const currentTask = routine.value[currRoutineIdx.value];
  if (timeLeft.value === 0) {
    timeLeft.value = currentTask.time;
  }
  isRunning.value = true;

  playTTS(`${currentTask.name} 시작`);

  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval.value);
      moveToNextRoutine();
    }
  }, 1000);
};

// 다음 루틴으로 이동
const moveToNextRoutine = () => {
  currRoutineIdx.value++;
  if (currRoutineIdx.value < routine.value.length) {
    timeLeft.value = 0;
    startTimer();
  } else {
    playTTS('루틴 종료.');
    resetRoutine();
  }
};

// 일시 정지
const pauseTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    isRunning.value = false;
  }
};

// 다시 재생
const resumeTimer = () => {
  if (!isRunning.value && currRoutineIdx.value !== null) {
    if (timeLeft.value === 0) {
      if (currRoutineIdx.value < routine.value.length - 1) {
        moveToNextRoutine();
      } else {
        playTTS('루틴 종료.');
        resetRoutine();
      }
    } else {
      startTimer();
    }
  }
};

// 루틴 상태 초기화
const resetRoutine = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  currRoutineIdx.value = null;
  timeLeft.value = 0;
  isStarted.value = false;
  isRunning.value = false;
};

// TTS(Text-to-speech) 소리 재생
const playTTS = (text) => {
  //브라우저 음성이 없을 경우 다른 API(responsiveVoice)로 재생
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis not supported in this browser.");
    playTTS2(text);
    return;
  }

  if (!isMute.value) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  }
};

// responsiveVoice
const playTTS2 = (text) => {
  responsiveVoice.speak(text, "Korean Female");
};

const insertResponsiveVoice = () => {
  if(!document.querySelector("#responsivevoice")){
    const script = document.createElement('script');
    script.id = 'responsivevoice';
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=XfoVXC5h';
    document.body.appendChild(script);
  }
}

const removeResponsiveVoice = () => {
  const script = document.querySelector("#responsivevoice");
  if(script){
    document.body.removeChild(script);
  }
};

//뒤로 가기
const goBack = () => {
  const prevUrl = historyStore.getPrevUrl();

  if (prevUrl !== '/') {
    router.back();
  } else {
    router.push({name: 'main'});
  }
};

onMounted(()=>{
  insertResponsiveVoice();
});

onBeforeUnmount(()=>{
  resetRoutine();
  removeResponsiveVoice();
});




</script>

<style scoped>

.detail > .timer, .detail > .timer-control {
  margin: clamp(12.5px, .25em, 2.5rem) 0;
}
.detail > .timer {
  margin-top: clamp(20px, .4em, 4rem);
}

.head {
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(20px, 20px);
  display: flex;
  justify-content: center;
  font-size: clamp(1rem, 2vw, 1.5rem);
}
.head > * {
  padding: 15px;
  display: flex;
  align-items: center;
}
.head i{
  font-size: 2rem;
}

.timer {
  display: flex;
  font-weight: bold;
  width: 90%;
  justify-content: center;
  align-items: center;
  max-height: 217px;
  font-size: clamp(1rem, 17vw, 217px);
}

.timer * {
  line-height: 1 !important;
}

.timer .current {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer .next {
  width: 40%;
  opacity: .7;
  line-height: 6.5vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5.5rem;
}
.timer .next p:first-child {
  font-size: clamp(1rem, 4.45vw, 52px);
}
.timer .next p:last-child {
  font-size: clamp(1rem, 9.2vw, 109px);
}

.timer .next p:last-child.no-routine {
  font-size: clamp(1rem, 5.1vw, 60px);
}

.timer-control{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 4.45vw, 52px);
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
  justify-content: flex-start;
  min-width: clamp(40px, 9vw, 120px);
}

.fa-solid {
  font-size: clamp(1rem, 6vw, 5rem);
}


/* 배경 */
.progress-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #C34141;
  z-index: -1;
}

</style>