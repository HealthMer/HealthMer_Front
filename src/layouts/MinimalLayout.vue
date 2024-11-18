<template>
    <div id="body">
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme';
const store = useThemeStore();
</script>

<style scoped>
main{
    align-items: center;
}
</style>