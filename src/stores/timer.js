import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const REST_API_URL = `http://localhost:8080/api/v1/timer`;
export const useTimerStore = defineStore('timer', () => {
  const isOpenModal = ref(false);
  
  const toggleModal = () => {
    isOpenModal.value = !isOpenModal.value;
  };

  const openModal = () => {
    isOpenModal.value = true;
  };

  const closeModal = () => {
    isOpenModal.value = false;
  };

  const timers = ref([]);

  const getTimerList = () => {
    axios.get(REST_API_URL)
    .then((res)=>{
      timers.value = res.data;
    })
    .catch((err)=>{
      console.error("에러 발생: ", err);
    });
  };
  
  const routine = ref([]);

  const getRoutine = (id) => {
    axios.get(`${REST_API_URL}/${id}/routine`)
    .then((res)=>{
      routine.value = res.data;
    });
  };
  
  const createTimer = (timerRequest) => {
    axios.post(`${REST_API_URL}/create`, timerRequest)
      .then((res)=>{
        console.log('새로운 타이머 생성 완료:', res.data);
        getTimerList();
        return res.data;
      })
      .catch((err)=>{
        console.error('타이머 생성 실패: ', err);
      });
  };

  const healthCategory = ref([]);
  
  const gethealthCategory = () => {
    axios.get(`${REST_API_URL}/category`)
    .then((res)=>{
      healthCategory.value = res.data;
    });
  };

  const oneCategory = ref([]);

  const getOneCategory = (id) => {
    axios.get(`${REST_API_URL}/${id}/category`)
    .then((res)=>{
      oneCategory.value = res.data;
    });
  };

  const deleteTimer = (id) => {
    axios.delete(`${REST_API_URL}/${id}`)
      .then((res)=>{
        console.log('타이머 삭제 완료:', res.data);
        getTimerList();
      })
      .catch((err)=>{
        console.error('타이머 삭제 실패: ', err);
      });
  };

  return {
    isOpenModal, toggleModal, openModal, closeModal,
    timers, getTimerList,
    healthCategory, gethealthCategory,
    oneCategory, getOneCategory,
    routine, getRoutine,
    createTimer,
    deleteTimer,
  }
});