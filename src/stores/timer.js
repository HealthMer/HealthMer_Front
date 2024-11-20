import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const timers = ref([
    {
    id : 1,
    userId : 1,
    title : '아침 루틴',
    viewsCount : 2,
    completeCount : 3,
    level : 5,
    created_at : 2024-11-14,
    },
    {
    id : 2,
    userId : 1,
    title : '저녁 운동~~',
    viewsCount : 2,
    completeCount : 3,
    level : 3,
    created_at : 2024-11-15,
    },
    {
      id : 3,
      userId : 1,
      title : '글자가 길어지면 어떻게 할지를 생각해 봐야 한다',
      viewsCount : 2,
      completeCount : 3,
      level : 2,
      created_at : 2024-11-19,
    },
    {
      id : 4,
      userId : 1,
      title : '글자가 길어지면 어떻게 할지를 생각해 봐야 한다',
      viewsCount : 2,
      completeCount : 3,
      level : 4,
      created_at : 2024-11-19,
    },
    {
      id : 5,
      userId : 1,
      title : '글자가 길어지면 어떻게 할지를 생각해 봐야 한다',
      viewsCount : 2,
      completeCount : 3,
      level : 1,
      created_at : 2024-11-19,
    },
  ]);

  return { timers }
});