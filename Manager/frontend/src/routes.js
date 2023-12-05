import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import DrinksInfo from './pages/DrinksInfo';
import DrinksPrice from './pages/DrinksPrice';
// import UserPage from './pages/UserPage';
import Orders from './pages/Orders';
import OrdersDetail from './pages/OrdersDetail';
import StaffInfo from './pages/StaffInfo';
import StaffAccount from './pages/StaffAccount';
import Categories from './pages/Categories';
import CustomerInfo from './pages/CustomerInfo';
import CustomerAccount from './pages/CustomerAccount';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import NewStaffInfo from './pages/StaffInfo/NewStaffInfo';
import EditStaffInfo from './pages/StaffInfo/EditStaffInfo';
import NewStaffAccount from './pages/StaffAccount/NewStaffAccount';
import EditStaffAccount from './pages/StaffAccount/EditStaffAccount';

import NewCustomerInfo from './pages/CustomerInfo/NewCustomerInfo';
import EditCustomerInfo from './pages/CustomerInfo/EditCustomerInfo';
import NewCustomerAccount from './pages/CustomerAccount/NewCustomerAccount';
import EditCustomerAccount from './pages/CustomerAccount/EditCustomerAccount';

import NewCategories from './pages/Categories/NewCategories';
import EditCategories from './pages/Categories/EditCategories';
import NewDrinksInfo from './pages/DrinksInfo/NewDrinksInfo';
import EditDrinksInfo from './pages/DrinksInfo/EditDrinksInfo';
import NewDrinksPrice from './pages/DrinksPrice/NewDrinksPrice';
import EditDrinksPrice from './pages/DrinksPrice/EditDrinksPrice';

import NewOrders from './pages/Orders/NewOrders';
import EditOrders from './pages/Orders/EditOrders';
import NewOrdersDetail from './pages/OrdersDetail/NewOrdersDetail';
import EditOrdersDetail from './pages/OrdersDetail/EditOrdersDetail';

import Statistic from './pages/Statistic';
import Proflie from './pages/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: currentUser ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        // { path: 'user', element: <UserPage /> },
        { path: 'staffaccount', element: <StaffAccount /> },
        { path: 'staffaccount/new', element: <NewStaffAccount /> },
        { path: 'staffaccount/edit/:name', element: <EditStaffAccount /> },
        { path: 'staffinfo', element: <StaffInfo /> },
        { path: 'staffinfo/new', element: <NewStaffInfo /> },
        { path: 'staffinfo/edit/:name', element: <EditStaffInfo /> },
        { path: 'customeraccount', element: <CustomerAccount /> },
        { path: 'customeraccount/new', element: <NewCustomerAccount /> },
        { path: 'customeraccount/edit/:name', element: <EditCustomerAccount /> },
        { path: 'customerinfo', element: <CustomerInfo /> },
        { path: 'customerinfo/new', element: <NewCustomerInfo /> },
        { path: 'customerinfo/edit/:name', element: <EditCustomerInfo /> },
        { path: 'categories', element: <Categories /> },
        { path: 'categories/new', element: <NewCategories /> },
        { path: 'categories/edit/:name', element: <EditCategories /> },
        { path: 'drinksinfo', element: <DrinksInfo /> },
        { path: 'drinksinfo/new', element: <NewDrinksInfo /> },
        { path: 'drinksinfo/edit/:name', element: <EditDrinksInfo /> },
        { path: 'drinksprice', element: <DrinksPrice /> },
        { path: 'drinksprice/new', element: <NewDrinksPrice /> },
        { path: 'drinksprice/edit/:name', element: <EditDrinksPrice /> },
        { path: 'orders', element: <Orders /> },
        { path: 'orders/new', element: <NewOrders /> },
        { path: 'orders/edit/:name', element: <EditOrders /> },
        { path: 'ordersdetail', element: <OrdersDetail /> },
        { path: 'ordersdetail/new', element: <NewOrdersDetail /> },
        { path: 'ordersdetail/edit/:name', element: <EditOrdersDetail /> },
        { path: 'statistic', element: <Statistic /> },

        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'profile',
      element: currentUser ? <Proflie /> : <Navigate to="/login" />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
