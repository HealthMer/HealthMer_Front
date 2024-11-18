import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isLight = ref(false);

  const toggleTheme = () => {
    isLight.value = !isLight.value;
  };

  watch(isLight, (themeisLight) => {
    if(themeisLight){
      document.documentElement.classList.add('light');
    }else{
      document.documentElement.classList.remove('light');
    }
  })

  return { isLight, toggleTheme }
}, {persist: true})
