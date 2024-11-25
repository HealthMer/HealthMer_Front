<template>
    <default-layout>
        <div class="timer-list-container">
            <div id="add-timer" @click="addTimer">
            <AddTimerSvg />
            <p>Add Timer</p>
          </div>

          <Category />
          <ul class="list-change-btn">
              <span @click="makeList" class="material-symbols-outlined">
                  view_list
              </span>
              <span @click="makeGrid" class="material-symbols-outlined">
                  grid_view
              </span>
          </ul>
          <TimerList :isGrid="isGrid"/>
          
      </div>
  
      <modal :isModalOpen="isModalOpen" @closeModal="closeModal">
      <TimerCreate />
      </modal>
        
    </default-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTimerStore } from '@/stores/timer';

const store = useTimerStore();

const isModalOpen = computed(()=>{
    return store.isOpenModal;
});

const addTimer = () => {
    store.changeToDefaultMode();
    store.openModal();
};

const closeModal = () => {
    store.closeModal();
};

const isGrid = ref(false);

const makeGrid = () => {
    isGrid.value = true;
};

const makeList = () => {
    isGrid.value = false;
};

import Modal from '@/components/Modal.vue';
import AddTimerSvg from '@/components/icons/AddTimerSvg.vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TimerCreate from '@/components/timer/TimerCreate.vue';
import TimerList from '@/components/timer/TimerList.vue';
import Category from '@/components/Category.vue';


</script>

<style scoped>
#add-timer{
    text-align: center;
}
#add-timer > p{
    font-weight: bold;
    font-size: 2.3rem;
}

.list-change-btn{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: .1rem .785rem;
}


</style>