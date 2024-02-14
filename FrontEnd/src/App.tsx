import ChatPage from '@/pages/chat/ChatPage';
import ChatRoomPage from '@/pages/chat/room/ChatRoomPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotifyPage from '@/pages/notify/NotifyPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ScrapPage from '@/pages/scrap/ScrapPage';
import SearchPage from '@/pages/search/SearchPage';
import SignupPage from '@/pages/signup/SignupPage';
import WritePage from '@/pages/write/WritePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import KakaoLoginRedirect from './components/login/KakaoLoginRedirect';
import NaverLoginRedirect from './components/login/NaverLoginRedirect';
import ReviewPage from './pages/Review/ReviewPage';
import BuyCategoryPage from './pages/home/buy/BuyCategoryPage';
import PurchaseDetailPage from './pages/home/detail/PurchaseDetailPage';
import SaleDetailPage from './pages/home/detail/SaleDetailPage';
import SaleCategoryPage from './pages/home/sale/SaleCategoryPage';
import LiveEndPage from './pages/live/LiveEndPage';
import LiveEntrancePage from './pages/live/LiveEntrancePage';
import PurchaseLivePage from './pages/live/PurchaseLivePage';
import SaleLivePage from './pages/live/SaleLivePage';
import LoginRedirectPage from './pages/login/LoginRedirectPage';
import OtherProfilePage from './pages/profile/OtherProfilePage';
import ProfileBuyPage from './pages/profile/buy/ProfileBuyPage';
import ProfileReviewPage from './pages/profile/review/ProfileReviewPage';
import ProfileSalePage from './pages/profile/sale/ProfileSalePage';
import BuyWritePage from './pages/write/BuyWritePage';
import SaleWritePage from './pages/write/SaleWritePage';
import PaymentRedirectPage from './pages/profile/PaymentRedirectPage';
import ProfilePointPage from './pages/profile/ProfilePointPage';
import useNotifyStore from './stores/useNotifyStore';
import userStore from './stores/userStore';
import { useEffect } from 'react';
import Toast from './components/@common/Toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/buy/:category',
    element: <BuyCategoryPage />,
  },
  {
    path: '/sale/:category',
    element: <SaleCategoryPage />,
  },
  {
    path: '/sale/detail/:id',
    element: <SaleDetailPage />,
  },
  {
    path: '/buy/detail/:id',
    element: <PurchaseDetailPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chat/rooms/:dealId',
    element: <ChatRoomPage />,
  },
  {
    path: '/review',
    element: <ReviewPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/login/redirect',
    element: <LoginRedirectPage />,
  },
  {
    path: '/login/redirect/kakao',
    element: <KakaoLoginRedirect />,
  },
  {
    path: '/login/redirect/naver',
    element: <NaverLoginRedirect />,
  },
  {
    path: '/notify',
    element: <NotifyPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/:nickname',
    element: <OtherProfilePage />,
  },
  {
    path: '/profile/sale',
    element: <ProfileSalePage />,
  },
  {
    path: '/profile/buy',
    element: <ProfileBuyPage />,
  },
  {
    path: '/profile/review',
    element: <ProfileReviewPage />,
  },
  {
    path: '/profile/point',
    element: <ProfilePointPage />,
  },
  {
    path: '/scrap',
    element: <ScrapPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/write',
    element: <WritePage />,
  },
  {
    path: '/write/sale',
    element: <SaleWritePage />,
  },
  {
    path: '/write/buy',
    element: <BuyWritePage />,
  },
  {
    path: '/live/entrance/:id',
    element: <LiveEntrancePage />,
  },
  {
    path: '/live/purchase/:id',
    element: <PurchaseLivePage />,
  },
  {
    path: '/live/sale/:id',
    element: <SaleLivePage />,
  },
  {
    path: '/live/end',
    element: <LiveEndPage />,
  },
  {
    path: '/payments/complete',
    element: <PaymentRedirectPage></PaymentRedirectPage>,
  },
]);

function App() {
  const { addNotification } = useNotifyStore();
  const { userId } = userStore();

  useEffect(() => {
    // eventSource 객체 생성
    const eventSource = new EventSource(import.meta.env.VITE_SSE_URL + userId);

    // eventSource Connection 됐을때
    eventSource.onopen = () => {
      console.log('연결완');
    };

    // eventSource 에러 시 할 일
    eventSource.onerror = async event => {
      console.log(event);
      eventSource.close();
    };

    eventSource.addEventListener('auction', async function (event) {
      const data = JSON.parse(event.data);

      addNotification(data);
      Toast.success('알림이 왔습니다 확인해보세요');
      console.log(data);
    });
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
