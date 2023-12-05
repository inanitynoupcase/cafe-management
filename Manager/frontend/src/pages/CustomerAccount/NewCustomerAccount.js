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
import { createCustomerAccount, getCustomerAccount } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const NewCustomerAccount = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const customerInfoList = useSelector((state) => state.users.customerinfo.allCustomerInfo);
  const [test, test1] = customerInfoList;
  const select = test.map(({ idKhachHang, HoTen }) => ({ idKhachHang, HoTen }));
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleStaffSelect = (event) => {
    setSelectedCustomer(event.target.value);
    console.log(selectedCustomer);
  };

  const handleBack = () => {
    navigate('/dashboard/customeraccount');
  };

  const formik = useFormik({
    initialValues: {
      TenTaiKhoan: '',
      MatKhau: '',
      ID_KhachHang: '',
      TrangThai: '',
    },
    validationSchema: Yup.object({
      TenTaiKhoan: Yup.string().required('Tên tài khoản không được để trống'),
      MatKhau: Yup.string().required('Mật khẩu không được để trống'),
      TrangThai: Yup.number().required('Không được để trống'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        TenTaiKhoan: values.TenTaiKhoan,
        MatKhau: values.MatKhau,
        ID_KhachHang: selectedCustomer,
        TrangThai: values.TrangThai,
      };
      createCustomerAccount(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 201) {
            getCustomerAccount(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Tạo mới Tài Khoản Khách Hàng thành công', severity: 'success' });
            resetForm();
            setSelectedCustomer('');
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
        <title> New Staff Account | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Staff Account </h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="TenTaiKhoan"
              label="Tên tài khoản"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.TenTaiKhoan}
              onChange={formik.handleChange}
              error={formik.touched.TenTaiKhoan && Boolean(formik.errors.TenTaiKhoan)}
              helperText={formik.touched.TenTaiKhoan && formik.errors.TenTaiKhoan}
            />
            <TextField
              name="MatKhau"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.MatKhau}
              onChange={formik.handleChange}
              error={formik.touched.MatKhau && Boolean(formik.errors.MatKhau)}
              helperText={formik.touched.MatKhau && formik.errors.MatKhau}
            />
            <FormControl fullWidth error={selectedCustomer === ''}>
              <InputLabel id="customer-select-label">Chọn Khách Hàng</InputLabel>
              <Select
                labelId="customer-select-label"
                id="customer-select"
                value={selectedCustomer}
                label="Chọn Khách Hàng"
                onChange={handleStaffSelect}
              >
                {select.map((customer) => (
                  <MenuItem key={customer.idKhachHang} value={customer.idKhachHang}>
                    {customer.HoTen}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="TrangThai"
              label="Trạng Thái"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.TrangThai}
              onChange={formik.handleChange}
              error={formik.touched.TrangThai && Boolean(formik.errors.TrangThai)}
              helperText={formik.touched.TrangThai && formik.errors.TrangThai}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Tạo mới Tài Khoản Nhân Viên
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};
export default NewCustomerAccount;
