import userStore from "@/stores/userStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export default function NaverLoginRedirect() {

    const queryParams = new URLSearchParams(location.search);
    const naverCode = queryParams.get("code"); // 인가 코드
    const state = queryParams.get("code"); // state 값
    const navigate = useNavigate();
    const { loginUser } = userStore();
    
    useEffect(() => {
        console.log(naverCode)
        if (naverCode) {
            axios.post(
                `${import.meta.env.VITE_BASE_URL}auth/login/naver`,
                { authorizationCode: naverCode, state: state }

            ).then((res) => {
                console.log(res.data.data)
                
                const { id, accessToken, refreshToken, nickname, area } = res.data.data
                const userId = Number(id)

                if (nickname) {
                    loginUser({
                        userId,
                        accessToken,
                        refreshToken,
                        nickname,
                        area,
                      });
                
                      navigate('/');
                } else {
                    loginUser({ accessToken: accessToken, area: '', nickname: '', refreshToken: refreshToken, userId: userId });
                    navigate('/signup');
                }
            })
            .catch((error) => {
                console.log('로그인 에러', error)
            });
        }
    })

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center relative">
            <div>로그인 진행중입니다...</div>
        </div>
    )
}
