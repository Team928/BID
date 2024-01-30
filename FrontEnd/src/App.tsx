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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyCategoryPage from './pages/home/buy/BuyCategoryPage';
import AuctionDetailPage from './pages/home/detail/AuctionDetailPage';
import SaleCategoryPage from './pages/home/sale/SaleCategoryPage';
import BuyLivePage from './pages/live/BuyLivePage';
import LiveEntrancePage from './pages/live/LiveEntrancePage';
import LivePage from './pages/live/LivePage';
import SellLivePage from './pages/live/SellLivePage';

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
    path: '/deals/:id',
    element: <AuctionDetailPage />,
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
    path: '/login',
    element: <LoginPage />,
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
    path: '/live',
    element: <LivePage />,
  },
  {
    path: '/live/entrance',
    element: <LiveEntrancePage />,
  },
  {
    path: '/live/buy/:id',
    element: <BuyLivePage />,
  },
  {
    path: '/live/sell/:id',
    element: <SellLivePage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
