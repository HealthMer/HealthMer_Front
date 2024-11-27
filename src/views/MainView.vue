<template>
  <default-layout>
    <transition-group :name="'background-'+currentWheel">
      <div :key="currentPage" v-if="currentPage === 1" class="background">
        <div class="video-container">
          <video autoplay loop muted>
            <source src="../assets/7033786-uhd_3840_2160_25fps.mp4" type="video/mp4">
          </video>
          <div class="scroll-icon"></div>
        </div>

        <div class="title">
          <span class="letter">H</span>
          <span class="letter">E</span>
          <span class="letter">A</span>
          <span class="letter">L</span>
          <span class="letter">T</span>
          <span class="letter">H</span>
          <span class="letter">M</span>
          <span class="letter">E</span>
          <span class="letter">R</span>
        </div>
      </div>
      <div :key="currentPage" v-if="currentPage === 2" class="background second">
        <LogoFullSvg />
        <router-Link :to="{name: 'timer-list'}">
          <btn>
            나만의 타이머 등록하러 가기
          </btn>
        </router-Link>
      </div>
    </transition-group>
  </default-layout>
</template>

<script setup>
import Btn from '@/components/Btn.vue';
import LogoFullSvg from '@/components/common/LogoFullSvg.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';

const currentPage = ref(1);
const currentWheel = ref('');

onMounted(() => {
  window.addEventListener('wheel', handleScroll);
});

function handleScroll(e) {
  console.log(e.deltaY)
  if(e.deltaY > 0){
    currentPage.value = 2;
    currentWheel.value = 'down';
  }else if(e.deltaY < 0) {
    currentPage.value = 1;
    currentWheel.value = 'up';
  }
}

onBeforeUnmount(() => {
    window.removeEventListener('wheel', handleScroll);
});

</script>

<style scoped>
.background-up-enter-active,
.background-up-leave-active,
.background-down-enter-active,
.background-down-leave-active {
    transition: transform .8s cubic-bezier(1, 0.5, 0.8, 1);
}

.background-up-enter-from, .background-down-leave-to {
  transform: translateY(-100%);
}

.background-up-leave-to, .background-down-enter-from {
  transform: translateY(100%);
}

.background.two {
  display: none;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.background .video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background .video-container .scroll-icon {
  position: absolute;
  left: calc(50vw - 10px);
  bottom: 32px;
  width: 21px;
  height: 55px;
  border: 2px solid #fff;
  border-radius: 30px;
}
.background .video-container .scroll-icon::before {
  /* content: '↓ Scroll'; */
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 1.2;
  padding: .9rem;
}
.background .video-container .scroll-icon::after {
  content: '●';
  position: absolute;
  color: #fff;
  font-size: 11px;
  left: 4px;
  animation: wheel 1.8s ease-out infinite;
}

@keyframes wheel {
    0%{
      transform: translateY(0px);
    }
    100%{
      transform: translateY(33px);
    }
}

.background .video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.light .background .video-container video {
  filter: brightness(1.5);
}
.background .title{
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  padding: 2rem;
  font-size: 8vw;
}

.letter:first-child,
.letter:nth-child(6) {
  color: var(--point-color2);
}

.background.second > * {
  margin: 1rem;
}

.background svg * {
  fill: var(--point-color2);
  animation: textbg 1.5s linear infinite;
}



@keyframes textbg {
    0%{
      color: var(--point-color);
    }
    50%{
      fill: var(--point-color);
    }
    100%{
      color: var(--point-color);
    }
}
</style>