import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', () => {
  const prevUrl = ref(null);

  const getPrevUrl = () => {
    return prevUrl.value;
  }

  const setPrevUrl = (url) => {
    prevUrl.value = url;
  };

  return { prevUrl, getPrevUrl, setPrevUrl }
})
