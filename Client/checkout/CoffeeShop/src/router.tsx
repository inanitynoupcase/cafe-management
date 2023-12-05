import { createHashRouter } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './routes/error-page'
import Index from './routes'
import Store from './routes/store'
import Blog from './routes/blog'
import Profile from './routes/profile'
import OrderHistory from './routes/orderHistory'
import Checkout from './routes/CheckoutRoutes/Checkout'

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <Store />
      }
    ]
  },
  {
    path: '/user/profile',
    element: <Profile />
  },
  {
    path: '/user/orderhistory',
    element: <OrderHistory />
  },
  {
    path: '/checkout',
    element: <Checkout />
  }
])

export default router
