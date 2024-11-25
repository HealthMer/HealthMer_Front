<template>
    <ul>
        <li v-for="category in categories" :key="category.name" @click="">{{category.name}}</li>
    </ul>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTimerStore } from '@/stores/timer';

const store = useTimerStore();

//구현 예정
const search = () => {
    const searchCondition = ref({
        key : 'title',
        word : '상체',
        orderBy : '',
        orderByDir : '',
    });

    store.searchTimers(searchCondition.value);
}

onMounted(()=>{
    store.gethealthCategory();
});

const categories = computed(()=>{
    return store.healthCategory;
});

</script>

<style scoped>
ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: .9785rem;
    height: fit-content;
    flex-wrap: wrap;
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