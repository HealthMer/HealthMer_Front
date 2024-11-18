<template>
    <div class="toggle">
        <div class="slider"></div>
    </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme';
const store = useThemeStore();
</script>

<style scoped>
.toggle{
    width: 122px;
    height: 46px;
    background-color: var(--background-color2);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    cursor: pointer;
}
.toggle .slider{
    width: 40px;
    height: 40px;
    margin: 2px;
    border-radius: 50%;
    background-color: #D9D9D9;
    transition: transform .3s;
}
.light .toggle .slider{
    background-color: #222222;
    transform: translateX(76px);
}
</style>