import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useRouter } from 'vue-router';

const REST_API_URL_AUTH = `http://localhost:8080/api/v1/auth`;
const REST_API_URL_USER = `http://localhost:8080/api/v1/user`;

export const useUserStore = defineStore('user', () => {
    const token = ref(sessionStorage.getItem('jwt') || null);
    const router = useRouter();

    // 로그인 상태 확인 함수
    const isAuthenticated = computed(()=>{
        return token.value !== null;
    });
    

    // 로그인 함수
    const loginUser = async (email, password) => {
    // console.log(email)
        try {
            const response = await axios.post(`${REST_API_URL_AUTH}/login/email`, {
                email: email,
                password: password,
            });

            if (response.status >= 200 && response.status < 300) {
                const newToken = response.data["access-token"];
                sessionStorage.setItem('jwt', newToken);
                token.value = newToken;

                alert('로그인에 성공했습니다.');
                router.push({name: 'main'});
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다.');
        }
    };

    // 로그아웃 함수
    const logoutUser = () => {
        sessionStorage.removeItem('jwt');
        token.value = null;
        alert('로그아웃 되었습니다.');
        router.push({name:'signin'});
    };

    // 회원가입 API 호출
    const registerUser = async(email, password, passcheck, nickname, age, gender) => {
        try {
            const userData = {
                email: email,
                password: password,
                nickname: nickname,
                age: age,
                genderId: 1,
            };

            // const response = await axios.post('http://localhost:8080/api/v1/auth/register/email', null, {
            //     params: {
            //         email: email,
            //         password: password,
            //         nickname: nickname,
            //         age: age,
            //         genderId: 1
            //     },
            // });
            const response = await axios.post(`${REST_API_URL_AUTH}/register/email`, userData);

            if (response.status >= 200 && response.status < 300) {
                alert('회원가입에 성공했습니다.');
                router.push({name: 'signin'});
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    // 인증이 필요한 API 호출 함수
    const fetchUserData = async () => {
        if (!token.value) {
            throw new Error('로그인이 필요합니다.');
        }

        try {
            const response = await axios.get(`${REST_API_URL_USER}/data`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('사용자 데이터 요청 실패:', error);
            throw error;
        }
    };


    return { 
      token, isAuthenticated,
      loginUser, logoutUser,
      registerUser,
      fetchUserData,
    }
})
