<template>
    <div class="sign-box">
        <Logo class="large" @click="window.history.pushState({}, '', `/${anotherSign.value}`);"/>
        <div class="sign-form">
            <h2>{{ formTitle }}</h2>

            <div class="slide-box" :style="{height: fitHeight + 'px'}">
                <transition-group :name="slideTransitionName">
                    <div :key="currentPage" v-if="currentPage == 1" class="slide">
                        <InputField :id="'email'" :name="'email'" :type="'email'" v-model.trim="email" :placeholder="'이메일'" class="full" :required="true"/>
                        <InputField :id="'password'" :name="'password'" :type="'password'" v-model.trim="password" :placeholder="'비밀번호'" class="full" :required="true"/>
                        <InputField v-if="isSignup" :id="'passcheck'" :name="'passcheck'" :type="'password'" v-model="passcheck" :placeholder="'비밀번호 확인'" class="full" :required="true"/>
                    </div>
                    <div :key="currentPage" v-if="isSignup && currentPage == 2" class="slide">
                        <InputField :id="'nickname'" :name="'nickname'" :type="'text'" v-model="nickname" :placeholder="'닉네임'" class="full"/>
                        <InputField :id="'age'" :name="'age'" :type="'number'" v-model="age" :placeholder="'나이'" class="full"/>
                        <InputField :isSelect="true" :options="genderOptions" :id="'gender'" :name="'gender'" v-model="gender" class="full"/>
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
                <btn class="point" @click="goToAnotherSign">
                    {{ anoterTitle }}
                </btn>
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
import { useUserStore } from '@/stores/user';

import Logo from './common/Logo.vue';
import Btn from './Btn.vue';
import InputField from './InputField.vue';

const props = defineProps({
    isSignup: Boolean,
});

const router = useRouter();
const userStore = useUserStore();

const formTitle = ref('');
const anoterTitle = ref('');

const currentPage = ref(1);
const maxPage = ref(1);

const fitHeight = ref(200);

//인풋 정보
const email = ref('');
const password = ref('');
const passcheck = ref('');
const nickname = ref('');
const age = ref(null);
const gender = ref(1);
const genderOptions = ref([
    {value: 1, name: 'MALE'},
    {value: 2, name: 'FEMALE'},
    {value: 3, name: 'ETC'},
]);

if(props.isSignup === true){
    maxPage.value = 2;
    formTitle.value = 'Sign Up';
    anoterTitle.value = 'Sign In';
}else{
    formTitle.value = 'Sign In';
    anoterTitle.value = 'Sign Up';
}

const anotherSign = computed(()=>{
    if(props.isSignup === true){
        return 'signin'
    } else {
        return 'signup'
    }
});

const goToAnotherSign = () => {
    window.history.pushState({}, '', `/${anotherSign.value}`);

    router.replace({name: anotherSign.value});
};

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
    } else if (currentPage.value === maxPage.value) {
        if (props.isSignup) {
            // console.log("korea.....")

            if(email.value.trim() === null || email.value.trim() === ''){
                alert('이메일은 필수 입력입니다.');
                return;
            }

            if(password.value.trim() === null || password.value.trim() === ''){
                alert('비밀번호를 입력해주세요.');
                return;
            }

            if (password.value !== passcheck.value) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            if(gender.value < 1 || gender.value > 3){
                alert('잘못된 입력입니다.');
                return;
            }

            // console.log(email.value);
            userStore.registerUser(
                email.value, 
                password.value,
                nickname.value, 
                age.value, 
                gender.value
            );
        } else {
            userStore.loginUser(email.value, password.value);
        }
    }
}

// 브라우저의 뒤로 가기 버튼 처리
const handlePopState = (e) => {
    if(e.state && e.state.page) {
        currentPage.value = e.state.page;
    } else {
        router.back();
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

button{
    width: 100%;
    text-align: center;
}

.bottom-btn {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-grow: 1;
}

.bottom-btn button.point{
    width: 164px;
}

.slide-box {
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