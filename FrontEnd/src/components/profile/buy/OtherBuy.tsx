import StateButton from "@/components/@common/StateButton"
import { useProfile } from "@/hooks/profile/useProfile"
import { useNavigate, useParams } from "react-router-dom"

const OtherBuy = () => {

    const navigate = useNavigate()

    const { useUserProfile,  useBuyHost  } = useProfile()
    const { nickname } = useParams()

    const {
        data: userProfileInfo
    } = useUserProfile(nickname!)

    const {
        data: buyHostInfo
    } = useBuyHost(`${userProfileInfo?.data.nickname}`)

    const handleClick = (dealId: number) => {
      navigate(`/buy/detail/${dealId}`);
    };

    return (
        <div>
            {buyHostInfo?.data.purchaseSimpleRes.map((item, index) => (
                <div key={index} className="px-BID_P py-3 gap-4 border-b border-[#D9D9D9] flex items-center" onClick={() => handleClick(item.dealSimpleRes.id)}>
                <div className="w-32 h-32">
                  <img
                    className="w-full h-full rounded-xl"
                    src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
                  ></img>
                </div>
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex items-center justify-between">
                    <StateButton deals={'sale'} status={`${item.status}`} />
                  </div>
                  <div className="py-2">
                    <p className="text-md">{item.dealSimpleRes.title}</p>
                    <p className="text-sm truncate whitespace-normal line-clamp-2">{item.dealSimpleRes.content}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
    )
}
export default OtherBuy