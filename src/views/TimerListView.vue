<template>
    <default-layout>
      
      <div class="timer-list-container">
          <div id="add-timer" @click="openModal">
            <AddTimerSvg />
            <p>Add Timer</p>
          </div>

          <Category />
          <GridViewSvg /> <ListViewSvg />
          <TimerList />
          
      </div>
  
      <modal :isModalOpen="isModalOpen" @closeModal="closeModal">
      <TimerCreate />
      </modal>
        
    </default-layout>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

import Modal from '@/components/Modal.vue';
import AddTimerSvg from '@/components/icons/AddTimerSvg.vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TimerCreate from '@/components/timer/TimerCreate.vue';
import TimerList from '@/components/timer/TimerList.vue';
import Category from '@/components/Category.vue';
import GridViewSvg from '@/components/icons/GridViewSvg.vue';
import ListViewSvg from '@/components/icons/ListViewSvg.vue';


</script>

<style>
#add-timer{
    cursor: pointer;
    transition: all .3s;
    text-align: center;
}

html.light #timer > *:not(.hand){
    fill: #000;
}

#add-timer:hover > *{
    filter: drop-shadow(0px 0px 6px #FE0013);
    color: #FE0013;
}

html #add-timer:hover #timer > *{
    fill: #FE0013;
}

#add-timer:hover #timer > .hand{
    fill: #fff;
    animation: rotate .8s ease forwards;
}

html.light #add-timer:hover #timer > .hand{
    fill: #000;
}

#add-timer:not(:hover) #timer > .hand {
    animation: rotate-reverse .8s ease forwards;
}
#add-timer > p{
    font-weight: bold;
    font-size: 2.3rem;
}

/* 애니메이션 */

@keyframes rotate{
    0%{
        transform: rotate(0deg);
        transform-origin: 88px 102px;
    }
    100%{
        transform: rotate(180deg);
        transform-origin: 88px 102px;
    }
}
@keyframes rotate-reverse{
    0%{
        transform: rotate(180deg);
        transform-origin: 88px 102px;
    }
    100%{
        transform: rotate(0deg);
        transform-origin: 88px 102px;
    }
}
</style>