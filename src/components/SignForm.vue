<template>
    <div class="sign-box">
        <Logo class="large"/>
        <div class="sign-form">
            <h2>{{ formTitle }}</h2>

            <div class="slide-box">
                    <transition-group :name="slideTransitionName">
                    <div :key="currentPage" v-if="currentPage == 1" class="slide">
                        <InputField class="full" :placeholder="'이메일'"/>
                        <InputField class="full" :placeholder="'비밀번호'"/>
                        <InputField class="full" :placeholder="'비밀번호 확인'" v-if="isSignup"/>
                    </div>
                    <div :key="currentPage" v-if="isSignup && currentPage == 2" class="slide">
                        <InputField class="full" :placeholder="'비밀번호'"/>
                    </div>
                    <div :key="currentPage" v-if="isSignup && currentPage == 3" class="slide">
                        <InputField class="full"/>
                    </div>
                </transition-group>
            </div>
            <btn @click="goToNext" v-if="currentPage !== maxPage">
                Next
            </btn>
            <btn @click="goToNext" v-if="currentPage === maxPage">
                {{ formTitle }}
            </btn>
            <div class="bottom-btn">
                <router-link :to="anotherSignUrl">
                    <btn class="point">
                        {{ anoterTitle }}
                    </btn>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
//인풋 폼
// 아이디 = email
// 이메일 인증
// 비밀번호
// 비밀번호 확인
// 닉네임
// 나이, 성별
// *작성하면 같은 여건의 사람들이 좋아하는 영상, 타이머를 추천 받을 수 있습니다.

import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import Logo from './Logo.vue';
import Btn from './Btn.vue';
import InputField from './InputField.vue';

const props = defineProps({
    isSignup: Boolean,
});

const router = useRouter();

const formTitle = ref('');
const anoterTitle = ref('');

const currentPage = ref(1);
const maxPage = ref(1);

//차후 구현 추가
const nextUrl = computed(()=>{
    if(props.isSignup === true && currentPage.value === maxPage.value){
        //회원가입
        return '/'
    } else if (props.isSignup === false && currentPage.value === maxPage.value){
        //로그인
        return '/'
    }
});

if(props.isSignup === true){
    maxPage.value = 3;
    formTitle.value = 'Sign Up';
    anoterTitle.value = 'Sign In';
}else{
    formTitle.value = 'Sign In';
    anoterTitle.value = 'Sign Up';
}

const anotherSignUrl = computed(()=>{
    if(props.isSignup === true){
        return '/signin'
    } else {
        return '/signup'
    }
});

const slideTransitionName = ref('input-slide');
watch(currentPage, (newPage, oldPage) => {
    if (newPage > oldPage) {
        slideTransitionName.value = 'input-slide-next';
    } else if (newPage < oldPage) {
        slideTransitionName.value = 'input-slide-prev';
    }
});

const goToNext = () => {
    if(currentPage.value < maxPage.value){
        currentPage.value++;
        window.history.pushState({page : currentPage.value}, '');
    }
}

const goToPrevious = () => {
    if(currentPage.value < maxPage.value){
        currentPage.value--;
        window.history.pushState({page : currentPage.value}, '');
    }
}

// 브라우저의 뒤로 가기 버튼 처리
const handlePopState = (e) => {
    if (currentPage.value == 1) {
        router.back();
    } else if(e.state && e.state.page) {
        currentPage.value = e.state.page;
    }
};

//뒤로 가기 처리
onMounted(() => {
    window.history.replaceState({page : currentPage.value}, ''); //초기화
    window.addEventListener('popstate', handlePopState);
});

//뒤로 가기 처리 정리
onBeforeUnmount(() => {
    window.history.replaceState({page : 1}, ''); //초기화
    window.removeEventListener('popstate', handlePopState)
});
</script>

<style scoped>
.input-slide-prev-enter-active, .input-slide-prev-leave-active, .input-slide-next-enter-active, .input-slide-next-leave-active {
    transition: transform 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.input-slide-prev-enter-from, .input-slide-next-leave-to {
    transform: translateX(-100%);
}
.input-slide-prev-leave-to, .input-slide-next-enter-from {
    transform: translateX(100%);
}

h2{
    font-size: 2rem;
    font-weight: bold;
}

.sign-box{
    transform: translateY(-35px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.sign-form{
    margin-top: 33px;
    width: 390px;
    height: 585px;
    max-width: 100%;
    background-color: var(--background-color2);
    position: relative;
    border-radius: 30px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px;
}
.sign-form:before, .sign-form:after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: var(--background-color3);
    z-index: -1;
}

.sign-form:before{
    transform: translate(-15px, -16px);
}

.sign-form:after{
    transform: translate(10px, 20px);
}

a, button{
    width: 100%;
    text-align: center;
}

.bottom-btn {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
}

.bottom-btn button.point{
    width: 164px;
}

.slide-box {
    min-height: 200px;
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
}
.slide-box .slide{
    position:absolute;
    width: 100%;
}

@media (max-height: 800px) {
    .sign-box {
        transform: translateY(0);
    }
}

@media (max-width: 485px) {
    .sign-form:before, .sign-form:after{
        display: none;
    }
}

@media (max-width: 392px) {
    .sign-form {
        border-radius: 0;
        border-left: none;
        border-right: none;
        padding: 1rem;
    }
}
</style>