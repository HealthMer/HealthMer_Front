import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axiosInstance';

export default {
  methods: {
    async fetchData() {
      try {
        const response = await apiClient.get('/data');
        console.log(response.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    }
  }
};

const REST_API_URL_TIMER = `http://localhost:8080/api/v1/timer`;
const REST_API_URL_CATEGORY = `http://localhost:8080/api/v1/category`;

export const useTimerStore = defineStore('timer', () => {
  const isOpenModal = ref(false);
  const isEditMode = ref(false);

  const toggleModal = () => {
    isOpenModal.value = !isOpenModal.value;
  };

  const openModal = () => {
    isOpenModal.value = true;
  };

  const closeModal = () => {
    isOpenModal.value = false;
  };

  const changeToEditMode = () => {
    isEditMode.value = true;
  }

  const changeToDefaultMode = () => {
    isEditMode.value = false;
  }

  const timers = ref([]);

  const getTimerList = () => {
    apiClient.get(REST_API_URL_TIMER)
    .then((res)=>{
      timers.value = res.data;
    })
    .catch((err)=>{
      console.error("에러 발생: ", err);
    });
  };

  const getTimerListByCategoryId = (id) => {
    apiClient.get(`${REST_API_URL_CATEGORY}/${id}`)
    .then((res)=>{
      timers.value = res.data;
    })
    .catch((err)=>{
      console.error("에러 발생: ", err);
    });
  };
  
  const oneTimer = ref({});

  const getOneTimer = (id) => {
    apiClient.get(`${REST_API_URL_TIMER}/${id}`)
    .then((res)=>{
      oneTimer.value = res.data;
    })
    .catch((err)=>{
      console.error("에러 발생: ", err);
    });
  };

  const searchTimers = (searchCondition) => {

    apiClient.get(`${REST_API_URL_TIMER}/search`,{
      params : searchCondition
    })
    .then((res)=>{
      timers.value = res.data;
    })
    .catch((err)=>{
      console.error("에러 발생: ", err);
    });

  };

  const routine = ref([]);

  const getRoutine = (id) => {
    apiClient.get(`${REST_API_URL_TIMER}/${id}/routine`)
    .then((res)=>{
      routine.value = res.data;
    });
  };
  
  const createTimer = (timerRequest) => {
    apiClient.post(`${REST_API_URL_TIMER}/create`, timerRequest)
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
    apiClient.get(`${REST_API_URL_TIMER}/category`)
    .then((res)=>{
      healthCategory.value = res.data;
    });
  };

  const oneCategory = ref([]);

  const getOneCategory = (id) => {
    apiClient.get(`${REST_API_URL_TIMER}/${id}/category`)
    .then((res)=>{
      oneCategory.value = res.data;
    });
  };

  const updateTimer = (id, updatedTimerRequest) => {
    apiClient.put(`${REST_API_URL_TIMER}/${id}`, updatedTimerRequest)
      .then((res)=>{
        console.log('타이머 수정 완료: ', res.data);
        getTimerList();
      })
      .catch((err)=>{
        console.error('타이머 수정 실패: ', err)
      });
  };

  const deleteTimer = (id) => {
    apiClient.delete(`${REST_API_URL_TIMER}/${id}`)
      .then((res)=>{
        console.log('타이머 삭제 완료:', res.data);
        getTimerList();
      })
      .catch((err)=>{
        console.error('타이머 삭제 실패: ', err);
      });
  };

  const initTimer = () => {
    timers.value = [];
  }

  return {
    isOpenModal, toggleModal, openModal, closeModal,
    isEditMode, changeToEditMode, changeToDefaultMode,
    createTimer,
    oneTimer, getOneTimer,
    timers, getTimerList, getTimerListByCategoryId,
    searchTimers,
    updateTimer,
    deleteTimer,
    healthCategory, gethealthCategory,
    oneCategory, getOneCategory,
    routine, getRoutine,
    initTimer,
  }
});