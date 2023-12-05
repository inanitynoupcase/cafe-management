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
import { createDrinksPrice, getDrinksPrice } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const NewDrinksPrice = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const drinksInfolist = useSelector((state) => state.drinks.drinksinfo.allDrinksInfo);
  const [test, test1] = drinksInfolist;
  const select = test.map(({ idDoUong, TenDoUong }) => ({ idDoUong, TenDoUong }));
  const [selectedDrinks, setSelectedDrinks] = useState('');

  const handleDrinksSelect = (event) => {
    setSelectedDrinks(event.target.value);
    console.log(selectedDrinks);
  };

  const handleBack = () => {
    navigate('/dashboard/drinksprice');
  };

  const formik = useFormik({
    initialValues: {
      ID_DoUong: '',
      TenDoUong: '',
      ID_NhanVien: '',
      GiaDoUong: '',
    },
    validationSchema: Yup.object({
      GiaDoUong: Yup.number().required('Giá không thể để trống'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        ID_DoUong: selectedDrinks,
        ID_NhanVien: user.ID_TaiKhoan,
        Gia: parseInt(values.GiaDoUong, 10),
      };
      console.log(newUser);
      createDrinksPrice(user.accessToken, dispatch, newUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 201) {
            getDrinksPrice(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Tạo Giá Đồ Uống thành công', severity: 'success' });
            resetForm();
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
        <title> New Drinks Price | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Drinks Price </h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl fullWidth error={selectedDrinks === ''}>
              <InputLabel id="Drinks-select-label">Chọn Đồ Uống</InputLabel>
              <Select
                labelId="taff-select-label"
                id="Drinks-select"
                value={selectedDrinks}
                label="Chọn Đồ Uống"
                onChange={handleDrinksSelect}
              >
                {select.map((Drinks) => (
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
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Tạo Giá Đồ Uống
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};
export default NewDrinksPrice;
