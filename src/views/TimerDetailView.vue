<template>
    <minimal-layout>
      <div class="detail">
        <div class="back" @click="goBack">
          <-
        </div>
        <div class="timer">
          <div class="current">
            <p class="time">01:00</p>
          </div>
          <div class="next">
            <p>next routine</p>
            <p class="time">01:00</p>
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
import { useRouter } from 'vue-router';
import { useHistoryStore } from '@/stores/history';

const router = useRouter();
const store = useHistoryStore();

const goBack = () => {
  const prevUrl = store.getPrevUrl();

  if (prevUrl !== '/') {
    router.back();
  } else {
    router.push({name: 'main'});
  }
};
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