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
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCategories, getCategories } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const NewCategories = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleBack = () => {
    navigate('/dashboard/categories');
  };

  const formik = useFormik({
    initialValues: {
      TenDanhMuc: '',
      HinhAnhDM: '',
    },
    validationSchema: Yup.object({
      TenDanhMuc: Yup.string().required('Tên danh mục không được để trống'),

      HinhAnhDM: Yup.string().required('Link hình ảnh danh mục không được để trống'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        TenDanhMuc: values.TenDanhMuc,
        HinhAnhDM: values.HinhAnhDM,
      };
      createCategories(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 201) {
            getCategories(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Tạo mới danh mục thành công', severity: 'success' });
            resetForm();
          } else {
            setNotification({ open: true, message: `Lỗi: Tên danh mục đã tồn tại`, severity: 'error' });
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
        <title> New Categories | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Categories</h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="TenDanhMuc"
              label="Tên Danh Mục"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.TenDanhMuc}
              onChange={formik.handleChange}
              error={formik.touched.TenDanhMuc && Boolean(formik.errors.TenDanhMuc)}
              helperText={formik.touched.TenDanhMuc && formik.errors.TenDanhMuc}
            />
            <TextField
              name="HinhAnhDM"
              label="Link Hình Ảnh Danh Mục"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.HinhAnhDM}
              onChange={formik.handleChange}
              error={formik.touched.HinhAnhDM && Boolean(formik.errors.HinhAnhDM)}
              helperText={formik.touched.HinhAnhDM && formik.errors.HinhAnhDM}
              // InputLabelProps={{ shrink: true }}
            />
            {formik.values.HinhAnhDM && (
              <Card sx={{ maxWidth: 300, margin: 'auto' }}>
                <CardMedia component="img" image={formik.values.HinhAnhDM} alt="Hình ảnh xem trước" />
                <CardContent>
                  <p style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>Hình ảnh xem trước</p>
                </CardContent>
              </Card>
            )}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Tạo mới Danh Mục
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};
export default NewCategories;
