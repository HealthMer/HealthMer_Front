<template>
    <div class="input-field">
        <label v-if="isLabel" :for="id">{{ labelContent }}</label>
        <input
            v-if="!isSelect && !isTextarea"
            :type="type"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateValue"
            />
        <select
            v-if="isSelect"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            @input="updateValue"
            >
            <option v-for="op in options" :value="op.value" :key="op.value">{{ op.name }}</option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    placeholder : String,
    labelContent : String,
    type : String,
    id : String,
    name : String,
    modelValue : {
        type: [String, Number, Boolean],
        default : '',
    },
    isLabel: {
        type : Boolean,
        default: false,
    },
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

const emit = defineEmits();

const updateValue = (e) => {
    emit('update:modelValue', e.target.value);
};

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