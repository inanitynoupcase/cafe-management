import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  TextField,
  TableHead,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections

import { loginSuccess } from '../redux/authSlice';
import { createAxios } from '../createInstance';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Statistic() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const ordersList = useSelector((state) => state.orders.orders.allOrders);
  const [test, test1] = ordersList;
  const calculateTotalRevenue = (startDate, endDate) => {
    const filteredOrders = test.filter((order) => {
      const orderDate = new Date(order.NgayDat);
      orderDate.setHours(0, 0, 0, 0);
      orderDate.setDate(orderDate.getDate());

      orderDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate());

      orderDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate());

      return orderDate >= startDate && orderDate <= endDate && order.trangThai === 'Đã hoàn thành';
    });
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.TongTien, 0);

    return totalRevenue;
  };

  const renderDailyStatistic = () => {
    const statisticData = [];
    const currentDate = new Date();
    const currentDate1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    for (let i = 0; i < 7; i += 1) {
      const date = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), currentDate1.getDate() - i);
      console.log(date);
      const formattedDate = date.toLocaleDateString('en-GB');

      const totalRevenue = calculateTotalRevenue(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Tạo mới đối tượng Date từ ngày đúng trong vòng lặp
        new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Tạo mới đối tượng Date từ ngày đúng trong vòng lặp
      );
      console.log(formattedDate);
      console.log(i, ' ', totalRevenue);
      statisticData.push({
        date: formattedDate,
        totalRevenue,
      });
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statisticData.map((data) => (
              <TableRow key={data.date}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.totalRevenue} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderMonthlyStatistic = () => {
    const statisticData = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < 12; i += 1) {
      let month = currentMonth - i;
      let year = currentYear;

      // Xử lý trường hợp tháng dưới 0
      if (month < 0) {
        month += 12;
        year -= 1;
      }

      const totalRevenue = calculateTotalRevenue(new Date(year, month, 1), new Date(year, month + 1, 0));

      // Định dạng chuỗi Tháng/Năm
      const formattedMonthYear = `${month + 1}/${year}`;

      statisticData.push({
        month: formattedMonthYear,
        totalRevenue,
      });
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Total Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statisticData.map((data) => (
              <TableRow key={data.month}>
                <TableCell>{data.month}</TableCell>
                <TableCell>{data.totalRevenue} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Helmet>
        <title>Statistic | The Coffee</title>
      </Helmet>

      <Card>
        <Stack spacing={2} p={2}>
          <Typography variant="h6">Daily Statistic</Typography>
          {renderDailyStatistic()}

          <Typography variant="h6">Monthly Statistic</Typography>
          {renderMonthlyStatistic()}
        </Stack>
      </Card>
    </>
  );
}
