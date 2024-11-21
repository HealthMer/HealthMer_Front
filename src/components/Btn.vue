<template>
    <component :is="tag" class="box">
        <slot></slot>
    </component>
</template>

<script setup>
defineProps({
    tag: {
        type : String,
        default: 'button',
    }
});
</script>

<style scoped>
.box{
    display: flex;
    padding: 10px;
    border: 1px solid var(--btn-color);
    border-radius: 8px;
    background-color: transparent;
    color: var(--text-color);
    font-size: 16pt;
    cursor: pointer;
    text-align: center;
    transition: background-color .3s, drop-shadow .3s;
    align-items: center;
    justify-content: center;
}
button:hover{
    background-color: var(--btn-color-25);
    filter:drop-shadow(0px 0px 1px var(--border-color-25));
    box-shadow: 0 0px 5px var(--border-color-50);
}
button.point{
    border: 1px solid var(--point-color);
    color: var(--point-color);
}
button.point:hover{
    background-color: var(--point-color-25);
    filter:drop-shadow(0px 0px 1px var(--point-color-25));
    box-shadow: 0 0px 5px var(--point-color-50);
}
</style>