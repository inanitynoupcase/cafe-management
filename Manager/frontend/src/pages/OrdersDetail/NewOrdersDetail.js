import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {
  Button,
  Stack,
  Container,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createOrdersDetail, getOrdersDetail } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const NewOrdersDetail = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const ordersDetail = useSelector((state) => state.orders.orders.allOrders);
  const [test, test1] = ordersDetail;
  const select = test.map((idDonHang) => idDonHang);
  const [selectedOrders, setSelectedOrders] = useState('');

  const drinksInfolist = useSelector((state) => state.drinks.drinksinfo.allDrinksInfo);
  const [drinks, drinks1] = drinksInfolist;
  const drinksSelect = drinks.map(({ idDoUong, TenDoUong }) => ({ idDoUong, TenDoUong }));
  const [selectedDrinks, setSelectedDrinks] = useState('');

  const handleOrdersSelect = (event) => {
    setSelectedOrders(event.target.value);
  };

  const handleDrinksSelect = (event) => {
    setSelectedDrinks(event.target.value);
  };

  const handleBack = () => {
    navigate('/dashboard/ordersdetail');
  };

  const formik = useFormik({
    initialValues: {
      ID_DonHang: '',
      ID_DoUong: '',
      GiaDoUong: '',
      SoLuong: '',
    },
    validationSchema: Yup.object({
      GiaDoUong: Yup.number().required('Không được để trống'),
      SoLuong: Yup.number().required('Không được để trống'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        ID_DonHang: selectedOrders,
        ID_DoUong: selectedDrinks,
        GiaDoUong: values.GiaDoUong,
        SoLuong: values.SoLuong,
      };
      createOrdersDetail(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 201) {
            getOrdersDetail(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Tạo mới Chi tiết đơn hàng thành công', severity: 'success' });
            resetForm();
            setSelectedOrders('');
            setSelectedDrinks('');
          } else {
            setNotification({ open: true, message: `Lỗi: Trùng Thông Tin`, severity: 'error' });
          }
        })
        .catch(() => setNotification({ open: true, message: 'Lỗi: ', severity: 'error' }));
    },
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={notification.severity} onClose={handleCloseNotification}>
          {notification.message}
        </MuiAlert>
      </Snackbar>
      <Helmet>
        <title> New Orders Detail | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Orders Detail </h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl fullWidth error={selectedOrders === ''}>
              <InputLabel id="Orders-select-label">Chọn Đơn hàng</InputLabel>
              <Select
                labelId="Orders-select-label"
                id="Orders-select"
                value={selectedOrders}
                label="Chọn Đơn hàng"
                onChange={handleOrdersSelect}
              >
                {select.map((Orders) => (
                  <MenuItem key={Orders.idDonHang} value={Orders.idDonHang}>
                    {Orders.idDonHang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth error={selectedDrinks === ''}>
              <InputLabel id="Drinks-select-label">Chọn Đồ Uống</InputLabel>
              <Select
                labelId="taff-select-label"
                id="Drinks-select"
                value={selectedDrinks}
                label="Chọn Đồ Uống"
                onChange={handleDrinksSelect}
              >
                {drinksSelect.map((Drinks) => (
                  <MenuItem key={Drinks.idDoUong} value={Drinks.idDoUong}>
                    {Drinks.TenDoUong}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="GiaDoUong"
              label="Giá"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.GiaDoUong}
              onChange={formik.handleChange}
              error={formik.touched.GiaDoUong && Boolean(formik.errors.GiaDoUong)}
              helperText={formik.touched.GiaDoUong && formik.errors.GiaDoUong}
            />
            <TextField
              name="SoLuong"
              label="Số Lượng"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.SoLuong}
              onChange={formik.handleChange}
              error={formik.touched.SoLuong && Boolean(formik.errors.SoLuong)}
              helperText={formik.touched.SoLuong && formik.errors.SoLuong}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Tạo mới Chi Tiết Đơn hàng
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};
export default NewOrdersDetail;
