<template>
    <div class="input-field">
        <input type="text" :placeholder="placeholder"/>
    </div>
</template>

<script setup>
defineProps({
    placeholder : String,
    labelTitle : String,
});
</script>

<style scoped>
.input-field input{
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1.15rem;
    padding: .74rem .62rem;
}
.input-field.full input{
    width: 100%;
}
</style>