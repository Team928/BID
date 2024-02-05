import Header, { IHeaderInfo } from "@/components/@common/Header";
import { icons } from "@/constants/icons";

const ProfileBuyPage = () => {
    const info: IHeaderInfo = {
        left: icons.BACK,
        center: '내 역경매 내역',
        right_1: null,
        right_2: icons.NOTIFY,
        prev: '/profile',
      };


    return (
        <>
        <div>
            <Header info={info} />
        </div>
        </>
    )
}
export default ProfileBuyPage;