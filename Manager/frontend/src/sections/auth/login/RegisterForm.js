import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { registerUser } from '../../../redux/apiRequest';

import Iconify from '../../../components/iconify';

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.auth.msg);

  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      idNhanVien: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Không được để trống'),
      password: Yup.string().required('Không được để trống'),
      idNhanVien: Yup.string().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const newUser = {
        TenTaiKhoan: values.username,
        MatKhau: values.password,
        ID_NhanVien: values.idNhanVien,
      };
      registerUser(newUser, dispatch, navigate);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="username"
            label="Tên Đăng Nhập"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            name="password"
            label="Mật Khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="idNhanVien"
            label="Mã Nhân Viên"
            value={formik.values.idNhanVien}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.idNhanVien && Boolean(formik.errors.idNhanVien)}
            helperText={formik.touched.idNhanVien && formik.errors.idNhanVien}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover">
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Đăng Ký
        </LoadingButton>
        {msg && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {msg}
          </Typography>
        )}
      </form>
    </>
  );
}
