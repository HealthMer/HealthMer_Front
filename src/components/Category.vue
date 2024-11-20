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
    flex-direction: row;
    justify-content: center;
    font-size: .9785rem;
    height: fit-content;
}
ul li{
 padding-left: .2rem;
 cursor: pointer;
}
ul li:after{
    content: '|';
    padding-left: .2rem;   
}
ul li:last-child:after{
    content: '';
}
</style>