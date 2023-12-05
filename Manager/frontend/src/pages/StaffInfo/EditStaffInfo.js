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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateStaffInfo, getStaffInfo } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditStaffInfo = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/staffinfo');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();
  const staffInfoList = useSelector((state) => state.users.staffinfo.allStaffInfo);
  const [test, test1] = staffInfoList;
  const needEdit = test.find((nhanVien) => nhanVien.idNhanVien === parseInt(name, 10));
  const gender = needEdit.GioiTinh === 'Nam' ? 'true' : 'false';
  const status = needEdit.trangThai === 'Đang hoạt động' ? '1' : '2';
  const formik = useFormik({
    initialValues: {
      fullName: needEdit.HoTen || '',
      birthDate: needEdit.NgaySinh || '',
      gender: gender || 'true',
      address: needEdit.DiaChi || '',
      phone: needEdit.SDT || '',
      email: needEdit.Email || '',
      cccd: needEdit.CCCD || '',
      status: status || '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Họ và tên không được để trống'),
      birthDate: Yup.date()
        .required('Ngày sinh không được để trống')
        .test('is-adult', 'Bạn phải trên 18 tuổi', (value) => {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age > 18) {
            return true;
          }
          return false;
        }),
      gender: Yup.boolean().required('Giới tính không được để trống'),
      address: Yup.string().required('Địa chỉ không được để trống'),
      phone: Yup.string()
        .required('Số điện thoại không được để trống')
        .test('is-phone', 'Số điện thoại không hợp lệ', (value) => {
          const regex = /^[0-9]{10}$/;
          return regex.test(value);
        }),
      email: Yup.string()
        .required('Email không được để trống')
        .test('is-email', 'Email không hợp lệ', (value) => {
          const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return regex.test(value);
        }),
      cccd: Yup.string()
        .required('CCCD không được để trống')
        .test('is-cccd', 'CCCD không hợp lệ', (value) => {
          const regex = /^[0-9]{12}$/;
          return regex.test(value);
        }),
      status: Yup.string().required('Trạng thái không được để trống'),
    }),
    onSubmit: (values) => {
      const gioiTinh = values.gender === 'true';
      const editUser = {
        ID_NhanVien: parseInt(name, 10),
        HoTen: values.fullName,
        NgaySinh: values.birthDate,
        GioiTinh: gioiTinh,
        DiaChi: values.address,
        SDT: values.phone,
        Email: values.email,
        CCCD: values.cccd,
        Trang_Thai: values.status,
      };
      updateStaffInfo(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getStaffInfo(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Cập Nhật Thông Tin Thành Công', severity: 'success' });
          } else {
            setNotification({ open: true, message: `Lỗi: CCCD đã tồn tại`, severity: 'error' });
          }
        })
        .catch(() => setNotification({ open: true, message: 'Lỗi: ', severity: 'error' }));
      // Xử lý submit form khi cần thiết
      // values chứa dữ liệu mới của form sau khi người dùng chỉnh sửa
      console.log(editUser);
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
        <title> Staff Account Edit | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Back
          </Button>
          <h1>Edit staff account</h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="fullName"
              label="Họ và tên"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              name="birthDate"
              label="Ngày sinh"
              type="date"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
              helperText={formik.touched.birthDate && formik.errors.birthDate}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl
              component="fieldset"
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              sx={{ mt: 1, mb: 1 }}
            >
              <RadioGroup
                name="gender"
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue('gender', e.target.value === 'true')}
                row
              >
                <FormControlLabel value="true" control={<Radio />} label="Nam" />
                <FormControlLabel value="false" control={<Radio />} label="Nữ" />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender && <div>{formik.errors.gender}</div>}
            </FormControl>
            <TextField
              name="address"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              name="phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="cccd"
              label="Căn cước công dân"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.cccd}
              onChange={formik.handleChange}
              error={formik.touched.cccd && Boolean(formik.errors.cccd)}
              helperText={formik.touched.cccd && formik.errors.cccd}
            />
            <TextField
              name="status"
              label="Trạng thái"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Lưu Thay Đổi{' '}
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditStaffInfo;
