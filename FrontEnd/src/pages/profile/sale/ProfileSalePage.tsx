import Header, { IHeaderInfo } from "@/components/@common/Header";
import { icons } from "@/constants/icons";

const ProfileSalePage = () => {
    const info: IHeaderInfo = {
        left: icons.BACK,
        center: '내 경매 내역',
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
export default ProfileSalePage;