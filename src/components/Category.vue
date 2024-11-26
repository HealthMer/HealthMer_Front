<template>
    <ul>
        <li @click="setActiveCategory(null)" 
            :class="{ active: activeCategory === null }">All</li>
        <li v-for="category in categories" :key="category.name" @click="setActiveCategory(category.id)" :class="{ active: activeCategory === category.id }">{{category.name}}</li>
    </ul>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTimerStore } from '@/stores/timer';

const store = useTimerStore();

const activeCategory = ref(null);

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


const setActiveCategory = (categoryId) => {
    activeCategory.value = categoryId;
    if (categoryId === null) {
        store.getTimerList();  // 'All' 클릭 시 모든 타이머 리스트 가져오기
    } else {
        store.getTimerListByCategoryId(categoryId);  // 선택된 카테고리로 타이머 리스트 가져오기
    }
};


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
 transition: color 0.3s ease, font-weight 0.3s ease;
}
ul li:after{
    content: '|';
    padding-left: .2rem;
    color: var(--text-color) !important;
}
ul li:last-child:after{
    content: '';
}

ul li:hover {
    color: var(--point-color);
}

ul li.active {
    color: var(--point-color);
    font-weight: bold;
}
ul li.active:after {
    color: var(--text-color);
    font-weight: normal;
}
ul li.active:hover:after {
    color: var(--text-color) !important;
    font-weight: normal;
}
</style>