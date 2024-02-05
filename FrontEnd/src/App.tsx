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
import ReviewPage from './pages/Review/ReviewPage';
import BuyCategoryPage from './pages/home/buy/BuyCategoryPage';
import PurchaseDetailPage from './pages/home/detail/PurchaseDetailPage';
import SaleDetailPage from './pages/home/detail/SaleDetailPage';
import SaleCategoryPage from './pages/home/sale/SaleCategoryPage';
import LiveEndPage from './pages/live/LiveEndPage';
import LiveEntrancePage from './pages/live/LiveEntrancePage';
import LivePage from './pages/live/LivePage';
import PurchaseLivePage from './pages/live/PurchaseLivePage';
import SaleLivePage from './pages/live/SaleLivePage';
import LoginRedirectPage from './pages/login/LoginRedirectPage';
import ProfileBuyPage from './pages/profile/buy/ProfileBuyPage';
import ProfileReviewPage from './pages/profile/review/ProfileReviewPage';
import ProfileSalePage from './pages/profile/sale/ProfileSalePage';
import SaleWritePage from './pages/write/SaleWritePage';

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
    path: '/purchase/detail/:id',
    element: <PurchaseDetailPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chat/rooms/:roomId',
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
    path: '/notify',
    element: <NotifyPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
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
    path: '/live/:id',
    element: <LivePage />,
  },
  {
    path: '/live/entrance',
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
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
