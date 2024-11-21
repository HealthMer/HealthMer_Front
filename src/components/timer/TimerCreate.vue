<template>
    <div class="inner">
        <div class="form">
            <div class="title">Add Timer</div>
            <div class="inner-content">
                <ul class="element-list">
                    <li class="element">
                        <btn tag="div">Category</btn>
                        <div :class="categoryBoxClass" class="category-box">
                            <div class="category-select-box">
                                <div @click.stop="isCateGoryOpen = !isCateGoryOpen" class="select-category">
                                    <p @click.stop class="select-content-box" v-for="category in timerData.categories" :key="category.id">
                                        <span>{{ getCategoryNameById(category) }}</span>
                                        <span @click.stop="removeCategory(category)" class="delete-btn">x</span>
                                    </p>
                                </div>
                                <div :class="{'open' : isCateGoryOpen}" class="category-select">
                                    <div v-for="(category) in categories"
                                    :key="category.id"
                                    class="category-option"
                                    :class="{'checked': timerData.categories.includes(category.id)}">
                                    <input type="checkbox" :id="'category-'+category.id" :name="'category-'+category.id"
                                    v-model="timerData.categories"
                                    :value="category.id"
                                    />
                                    <label :for="'category-' + category.id">{{ category.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </li>


                    <li class="element">
                        <btn>Title</btn>
                        <InputField :id="'title'" :name="'title'" :type="'text'" v-model="timerData.title" class="full"/>
                    </li>


                    <li v-for="(time, idx) in timerData.routines"
                        :key="time.id"
                        class="element"
                        >
                        <btn>Time {{ idx + 1 }}</btn>
                        <ul class="element-list">
                            <li class="element">
                                <btn>name</btn>
                                <InputField :id="'name-'+time.id" :name="'name-'+time.id" :type="'text'" v-model="time.name" class="full"/>
                            </li>
                            <li class="element">
                                <btn>min : sec</btn>
                                <InputField :id="'min-'+time.id" :name="'min-'+time.id" :type="'number'" v-model="time.min" class="full"/>
                                :
                                <InputField :id="'sec-'+time.id" :name="'sec-'+time.id" :type="'number'" v-model="time.sec" class="full"/>
                            </li>
                            <li class="element">
                                <btn>type</btn>
                                <InputField :isSelect="true" :options="restOptions" :id="'type-'+time.id" :name="'type-'+time.id" v-model="time.type" class="full"/>
                            </li>
                        </ul>
                        <btn @click="removeInputTime(time.id)">X</btn>
                    </li>


                    <li class="element">
                        <btn @click="addInputTime">+</btn>
                    </li>
                    <li class="element">
                        <btn>Level</btn>
                        <InputField :isSelect="true" :options="levelOptions" :id="'level'" :name="'level'" v-model="timerData.level" class="full"/>
                    </li>
                </ul>
            </div>
            <div class="bottom-btn">
                <btn @click="submitTimerData" class="set-timer">SET TIMER</btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import InputField from '@/components/InputField.vue';
import Btn from '@/components/Btn.vue';

import { useTimerStore } from '@/stores/timer';

const timerStore = useTimerStore();

const router = useRouter();


onMounted(()=>{
    timerStore.gethealthCategory();
    timerData.value.routines.push({id: timeId.value++, name: '', min: 0, sec: 0, type: 0});
});

const testTitle = ref('');

const timerData = ref({
    title: '',
    level: null,
    categories : [],
    routines: [],
});



const levelOptions = ref([
    {value: 1,name: '아주 쉬움'},
    {value: 2,name: '쉬움'},
    {value: 3,name: '보통'},
    {value: 4,name: '어려움'},
    {value: 5,name: '매우 어려움'},
]);

const restOptions = ref([
    {value: 0, name: '운동'},
    {value: 1, name: '휴식'},
]);

const timeId = ref(1);

const addInputTime = () => {
    timerData.value.routines.push({id: timeId.value++, name: '', min: 0, sec: 0, type: 0});
};

const removeInputTime = (id) => {
    const idx = timerData.value.routines.findIndex(t => t.id === id);
    timerData.value.routines.splice(idx, 1);
}

const categories = computed(()=>{
    return timerStore.healthCategory;
});

const isCateGoryOpen = ref(false);

const isSelected = computed(()=>{
    return timerData.value.categories.length > 0;
});


const getCategoryNameById = (c) => {
  const category = categories.value.find(item => item.id === c); 
  return category ? category.name : 'no';
};


const removeCategory = (category) => {
  const idx = timerData.value.categories.findIndex(item => item.id == category.id);
  if (idx !== -1) {
    timerData.value.categories.splice(idx, 1);
  }
};

const categoryBoxClass = computed(()=>{
    if(isSelected.value && isCateGoryOpen.value){
        return 'no-holder open';
    } else if(isSelected.value){
        return 'no-holder';
    }else if(isCateGoryOpen.value){
        return 'open';
    }
    return '';
});




//전송
const submitTimerData = () => {

    if(timerData.value.title.trim() === ''){
        alert('제목을 입력해주세요.');
        return;
    }
    
    const routines = timerData.value.routines
    .filter(time => time.name.trim() !== '' && (time.min !== 0 || time.sec !== 0))
    .map(time=>({
        name : time.name,
        time : parseInt(time.min) * 60 + parseInt(time.sec),
        isRest : parseInt(time.type),
    }));
    
    if(routines.length == 0){
        alert('하나 이상의 루틴을 등록해주세요.');
        return;
    }

    const categories = timerData.value.categories
    .map(categoryId => ({
        healthCategoryId: categoryId,
    }));

    const timerRequest = {
        timer : {
            userId : 1,
            title : timerData.value.title,
            level : parseInt(timerData.value.level),
        },
        routines : routines,
        timerCategories : categories,
    };

    timerStore.createTimer(timerRequest).then(()=>{
        router.push('/timer');
    });
};

</script>

<style scoped>
.inner {
    display: flex;
    color: black;
    padding: 2rem;
    flex-direction: column;
    height: 100%;
    max-height: calc(100vh - 2rem);
}

.inner .title {
    text-align: center;
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 0;
}

.element {
    display: flex;
    align-items: stretch;
}

.inner input {
    width: 100%;
}

.inner > * {
    margin: 1rem;
}

.inner .form {
    display: flex;
    height: 100%;
    flex-direction: column;
}

.inner .form .element-list{
}

.inner-content {
    padding: 12px;
    border-radius: 8px;
    background-color: #DDDDDD;
    overflow: hidden;
    overflow-y: auto;
    flex-grow: 1;
    max-height: calc(100% - 64px - 47px);
}

.category-box {
    position: relative;
    width: 100%;
    min-height: 50px;
    border-radius: 8px;
    background-color: #fff;
}


.open.category-box{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

/* select 창 */
.category-select {
    width: 100%;
    position: absolute;
    background-color: #D9D9D9;
    padding: 1rem;
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid #000;
    border-radius: 0 0 8px 8px;
    display: none;
    top: 100%;
}

.category-select.open {
    display: block;
}

.category-select input[type="checkbox"] {
    display: none;
}

.category-select-box, .select-category {
    width: 100%;
    height: 100%;
}

.category-select-box{
    position: relative;
}

.category-select-box::before{
    content: '카테고리 선택(다중 선택 가능)';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    /* text-align: center; */
    font-size: .94rem;
    padding-left: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: .5;
    pointer-events: none;
}
.category-select-box::after{
    content: '▼';
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    font-size: .94rem;
    height: 100%;
    display: flex;
    align-items: center;
    pointer-events: none;
    justify-content: flex-end;
    padding-right: 1rem;
}

.select-category {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .2rem .3rem;
    padding-right: 3rem;
    cursor: pointer;
}
.select-content-box {
    background-color: #D9D9D9;
    width: fit-content;
    height: fit-content;
    margin: .2rem;
}

.select-content-box > *{
    margin: .2rem;
}
.select-content-box .delete-btn {
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    font-size: 16px;
}

.select-content-box .delete-btn:hover {
    background-color: rgba(0, 0, 0, .5);
}

.category-option {
    transition: background-color .3s;
}
.category-option.checked {
    background-color: rgba(0, 0, 0, .3);
}

.no-holder .category-select-box::before{
    content: '';
}

.select-content-box {
    font-size: .97rem;
}

.bottom-btn > * {
    width: 100%;
}

label {
    text-overflow: ellipsis;
}

/* btn 스타일 지정 */
.box {
    color: #000;
}
div.box{
    cursor: default;
}
.box.set-timer {
    background-color: #000;
    color: #fff;
}

</style>