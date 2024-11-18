<template>
    <button>
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
button{
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: transparent;
    color: var(--text-color);
    font-size: 16pt;
    cursor: pointer;
    text-align: center;
}
button.point{
    border: 1px solid var(--point-color);
    color: var(--point-color);
}
</style>