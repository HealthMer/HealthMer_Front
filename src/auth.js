// src/auth.js
import axios from 'axios';
import router from '@/router';

// 회원가입 API 호출
export const registerUser = async(email, password, passcheck, nickname, age, gender) => {
    console.log("korea.....")
    if (password !== passcheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

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
        const response = await axios.post('http://localhost:8080/api/v1/auth/register/email', userData);


        if (response.status === 201) {
            alert('회원가입에 성공했습니다.');
            router.replace({name: 'main'});
            return;
        }
    } catch (error) {
        console.error('회원가입 실패:', error);
        alert('회원가입에 실패했습니다.');
    }
};

// 로그인 함수
export const loginUser = async (email, password) => {
    console.log(email)
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/login/email', null, {
            params: {
                email: email,
                password: password,
            },
        });

        if (response.status >= 200 && response.status < 300) {
            const token = response.data.token;
            sessionStorage.setItem('jwt', response.data["access-token"]);

            alert('로그인에 성공했습니다.');
            router.push('/');
        }
    } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다.');
    }
};

// 로그아웃 함수
export const logoutUser = () => {
    sessionStorage.removeItem('jwt');
    alert('로그아웃 되었습니다.');
    router.push('/signin');
};

// 로그인 상태 확인 함수
export const isAuthenticated = () => {
    const token = sessionStorage.getItem('jwt');
    return token !== null;
};

// 인증이 필요한 API 호출 함수
export const fetchUserData = async () => {
    const token = sessionStorage.getItem('jwt');

    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }

    try {
        const response = await axios.get('http://localhost:8080/api/v1/user/data', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('사용자 데이터 요청 실패:', error);
        throw error;
    }
};
