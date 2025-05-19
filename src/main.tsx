import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Orders from './pages/orders.tsx';
// import CreateOrder from './Orders/createOrder.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
    children: [
      {
        path: "/orders",
        element: <Orders />,
        // children: [
        //   {
        //     path: "/createOrders",
        //     element: <CreateOrder/>
        //   },
        // ]
      },
      {
        path: "/spend",
        element: <div>Chi tiêu của bạn</div>,
      },
      {
        path: "/statistic",
        element: <div>thống kê</div>,
      },
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
