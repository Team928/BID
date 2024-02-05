import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <App />
    <ToastContainer
      position="top-right" // 알람 위치 지정
      autoClose={1000} // 자동 off 시간
      hideProgressBar={false} // 진행시간바 숨김
      rtl={false} // 알림 좌우 반전
    />
  </QueryClientProvider>,
);
