import userStore from "@/stores/userStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export default function KakaoLoginRedirect() {

    const queryParams = new URLSearchParams(location.search);
    const kakaocode = queryParams.get("code"); // 인가 코드
    const navigate = useNavigate();
    const { loginUser } = userStore();
    
    useEffect(() => {
        if (kakaocode) {
            axios.get(
                `${import.meta.env.VITE_BASE_URL}login/oauth2/code/kakao?code=${kakaocode}`
            ).then((res) => {
                console.log(res)
                
                const { id, accessToken, refreshToken, nickname, area } = res.data
                // console.log('accessToken', accessToken)
                // console.log('refreshToken', refreshToken)
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
