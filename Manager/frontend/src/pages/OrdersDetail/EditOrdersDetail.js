import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import MuiAlert from '@mui/material/Alert';
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
} from '@mui/material';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateOrdersDetail, getOrdersDetail } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditOrdersDetail = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/ordersdetail');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();

  const ordersDetail = useSelector((state) => state.orders.ordersdetail.allOrdersDetail);
  const [orderDetailList, OrdersDetailList1] = ordersDetail;
  const needEdit = orderDetailList.find((donHang) => donHang.idCTDonHang === parseInt(name, 10));

  const ordersList = useSelector((state) => state.orders.orders.allOrders);
  const [test, test1] = ordersList;
  const select = test.map((idDonHang) => idDonHang);

  const currentOrder = test.find((orders) => orders.idDonHang === needEdit.idDonHang);
  const [selectedOrders, setSelectedOrders] = useState(currentOrder.idDonHang);

  const drinksInfolist = useSelector((state) => state.drinks.drinksinfo.allDrinksInfo);
  const [drinks, drinks1] = drinksInfolist;
  const drinksSelect = drinks.map(({ idDoUong, TenDoUong }) => ({ idDoUong, TenDoUong }));
  const currentDrink = drinks.find((drink) => drink.TenDoUong === needEdit.TenDoUong);
  const [selectedDrinks, setSelectedDrinks] = useState(currentDrink.idDoUong);

  const currentOrders = test.find((orders) => orders.HoTen === needEdit.TenKhachHang);
  const handleOrdersSelect = (event) => {
    setSelectedOrders(event.target.value);
  };
  const handleDrinksSelect = (event) => {
    setSelectedDrinks(event.target.value);
  };
  const payment = needEdit.TenThanhToan === 'Tại Chỗ' ? 1 : 2;
  const status = needEdit.trangThai === 'Đã hoàn thành' ? 1 : 2;

  const formik = useFormik({
    initialValues: {
      ID_DonHang: selectedOrders || '',
      ID_DoUong: selectedDrinks || '',
      GiaDoUong: needEdit.GiaDoUong || '',
      SoLuong: needEdit.SoLuong || '',
    },
    validationSchema: Yup.object({
      GiaDoUong: Yup.number().required('Không được để trống'),
      SoLuong: Yup.number().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_CTDonHang: parseInt(name, 10),
        ID_DonHang: selectedOrders,
        ID_DoUong: selectedDrinks,
        GiaDoUong: values.GiaDoUong,
        SoLuong: values.SoLuong,
      };
      updateOrdersDetail(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getOrdersDetail(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Cập Nhật Thông Tin Thành Công', severity: 'success' });
          } else {
            setNotification({ open: true, message: `Lỗi: Trùng Thông Tin`, severity: 'error' });
          }
        })
        .catch(() => setNotification({ open: true, message: 'Lỗi: ', severity: 'error' }));
      // Xử lý submit form khi cần thiết
      // values chứa dữ liệu mới của form sau khi người dùng chỉnh sửa
      console.log('edit: ', editUser);
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
        <title> Edit Customer Account | The Coffee </title>
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
              Lưu thay đổi
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditOrdersDetail;
