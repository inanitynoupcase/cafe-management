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
import Select from '@mui/material/Select';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStaffAccount, getStaffAccount } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const NewStaffAccount = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const staffInfoList = useSelector((state) => state.users.staffinfo.allStaffInfo);
  const [test, test1] = staffInfoList;
  const select = test.map(({ idNhanVien, HoTen }) => ({ idNhanVien, HoTen }));
  const [selectedStaff, setSelectedStaff] = useState('');

  const handleStaffSelect = (event) => {
    setSelectedStaff(event.target.value);
    console.log(selectedStaff);
  };

  const handleBack = () => {
    navigate('/dashboard/staffaccount');
  };

  const formik = useFormik({
    initialValues: {
      TenTaiKhoan: '',
      MatKhau: '',
      ID_NhanVien: '',
      ID_ChucVu: '',
    },
    validationSchema: Yup.object({
      TenTaiKhoan: Yup.string().required('Tên tài khoản không được để trống'),
      MatKhau: Yup.string().required('Mật khẩu không được để trống'),
      ID_ChucVu: Yup.number().required('Chọn chức vụ'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        TenTaiKhoan: values.TenTaiKhoan,
        MatKhau: values.MatKhau,
        ID_NhanVien: selectedStaff,
        ID_ChucVu: values.ID_ChucVu,
      };
      createStaffAccount(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 201) {
            getStaffAccount(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Tạo mới Tài Khoản nhân viên thành công', severity: 'success' });
            resetForm();
            setSelectedStaff('');
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
            <FormControl fullWidth error={selectedStaff === ''}>
              <InputLabel id="staff-select-label">Chọn Nhân Viên</InputLabel>
              <Select
                labelId="taff-select-label"
                id="staff-select"
                value={selectedStaff}
                label="Chọn Nhân Viên"
                onChange={handleStaffSelect}
              >
                {select.map((staff) => (
                  <MenuItem key={staff.idNhanVien} value={staff.idNhanVien}>
                    {staff.HoTen}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="ID_ChucVu"
              label="ID Chức Vụ"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.ID_ChucVu}
              onChange={formik.handleChange}
              error={formik.touched.ID_ChucVu && Boolean(formik.errors.ID_ChucVu)}
              helperText={formik.touched.ID_ChucVu && formik.errors.ID_ChucVu}
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
export default NewStaffAccount;
