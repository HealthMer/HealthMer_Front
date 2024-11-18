<template>
    <ul>
        <li v-for="category in categories" :key="category.name">{{category.name}}</li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
    {name: '전체'},
    {name: '상체'},
    {name: '하체'},
    {name: '기타'},
]);

</script>

<style scoped>
ul{
    display: flex;
}
ul li:after{
    content: '|';
}
ul li:last-child:after{
    content: '';
}
</style>