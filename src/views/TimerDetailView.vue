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
          <hr>
          <p class="play"></p>
          <hr>
          <p class="volume-on">
            <span class="material-symbols-outlined">volume_up</span>
          </p>
        </div>
      </div>
    </minimal-layout>
</template>
  
<script setup>
import MinimalLayout from '@/layouts/MinimalLayout.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const referrer = document.referrer;
console.log(referrer)

const goBack = () => {
  
  if(referrer && referrer.includes('localhost:5173')){
    window.history.back();
  }else{
    router.push('/');
  }

};

</script>

<style scoped>
.back{
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(20px, 20px);
}
.timer .next{
  opacity: .7;
}
</style>