import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Orders from './pages/orders.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/spending',
        element: <div>Chi tiêu của bạn</div>,
      },
      {
        path: '/statistics',
        element: <div>Thống kê</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <div>Đăng nhập admin</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
