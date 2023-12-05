import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { loginUser } from '../../../redux/apiRequest';

import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const msg = useSelector((state) => state.auth.msg);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Không được để trống'),
      password: Yup.string().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const newUser = {
        TenTaiKhoan: values.username,
        MatKhau: values.password,
      };
      loginUser(newUser, dispatch, navigate);
    },
  });

  // const handleLogin = (e) => {
  //   // navigate('/dashboard', { replace: true });
  //   e.preventDefault();
  //   const newUser = {
  //     TenTaiKhoan: username,
  //     MatKhau: password,
  //   };
  //   loginUser(newUser, dispatch, navigate);
  // };
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <Checkbox name="remember" label="Ghi nhớ ngay" /> */}

          <Link variant="subtitle2" underline="hover">
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Đăng Nhập
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
