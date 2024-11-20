<template>
    <div class="input-field">
        <input v-if="!isSelect && !isTextarea" type="text" :placeholder="placeholder"/>
        <select v-if="isSelect" :placeholder="placeholder">
            <option v-for="op in options" value="op.value" :key="op.value">{{ op.value }}</option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    placeholder : String,
    labelTitle : String,
    isSelect: {
        type : Boolean,
        default: false,
    },
    isTextarea: {
        type : Boolean,
        default: false,
    },
    options : Array,
});
</script>

<style scoped>
.input-field *{
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1.15rem;
    padding: .74rem .62rem;
}
.input-field.full, .input-field.full *{
    width: 100%;
}
</style>