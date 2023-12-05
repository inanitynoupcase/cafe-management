import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

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
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { changePassword } from '../redux/apiRequest';

import { loginSuccess } from '../redux/authSlice';
import { createAxios } from '../createInstance';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Profile() {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const ordersList = useSelector((state) => state.orders.orders.allOrders);
  const [test, test1] = ordersList;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleBack = () => {
    navigate('/dashboard');
  };

  const gender = user.GioiTinhNV === true ? 'Nam' : 'Nữ';
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
      newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không trùng khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        ID_NhanVien: user.ID_NhanVien,
        oldPassword: values.currentPassword,
        newPassword: values.confirmPassword,
      };
      console.log(newUser);
      changePassword(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            setNotification({ open: true, message: 'Đổi mật khẩu thành công', severity: 'success' });
            resetForm();
          } else {
            setNotification({ open: true, message: `Lỗi: Mật Khẩu cũ không đúng`, severity: 'error' });
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
        <title>Profile | The Coffee</title>
      </Helmet>

      <Container>
        <Card>
          <Stack spacing={3} p={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
              </Button>
              <h1>Hồ sơ của bạn</h1>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Họ và Tên" variant="outlined" fullWidth disabled value={user.HoTenNV} />

                <TextField
                  label="Ngày Sinh"
                  type="date"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.NgaySinhNV}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField label="Giới tính" select variant="outlined" fullWidth disabled value={gender}>
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </TextField>

                <TextField label="Địa chỉ" variant="outlined" fullWidth disabled value={user.DiaChiNV} />

                <TextField label="Số điện thoại" variant="outlined" fullWidth disabled value={user.SDTNV} />

                <TextField label="Email nhân viên" variant="outlined" fullWidth disabled value={user.EmailNV} />

                <TextField label="CCCD" variant="outlined" fullWidth disabled value={user.CCCDNV} />

                <TextField
                  name="currentPassword"
                  label="Mật khẩu hiện tại"
                  type="password"
                  variant="outlined"
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                  helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                />

                <TextField
                  name="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  variant="outlined"
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                />

                <TextField
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  variant="outlined"
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Thay đổi mật khẩu
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
