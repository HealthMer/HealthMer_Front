<template>
    <default-layout>
        <div class="timer-list-container">
            <div id="add-timer" @click="openModal">
            <AddTimerSvg />
            <p>Add Timer</p>
          </div>

          <Category />
          <ul class="list-change-btn">
              <GridViewSvg @click="makeGrid"/> <ListViewSvg @click="makeList"/>
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

const openModal = () => {
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
import GridViewSvg from '@/components/icons/GridViewSvg.vue';
import ListViewSvg from '@/components/icons/ListViewSvg.vue';


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