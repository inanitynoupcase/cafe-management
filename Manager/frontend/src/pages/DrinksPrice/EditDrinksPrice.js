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
import { updateDrinksPrice, getDrinksPrice } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditDrinksPrice = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/DrinksPrice');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();

  const drinksInfoList = useSelector((state) => state.drinks.drinksinfo.allDrinksInfo);
  const [drinks, drinks1] = drinksInfoList;
  const select = drinks.map(({ idDoUong, TenDoUong }) => ({ idDoUong, TenDoUong }));

  const drinksPriceList = useSelector((state) => state.drinks.drinksprice.allDrinksPrice);
  const [test, test1] = drinksPriceList;
  const needEdit = test.find((gia) => gia.idGiaDoUong === parseInt(name, 10));

  const currentID = drinks.find((gia) => gia.idDoUong === needEdit.idDoUong);
  const [selectedDrinks, setSelectedDrinks] = useState(currentID.idDoUong);
  const handleDrinksSelect = (event) => {
    setSelectedDrinks(event.target.value);
    console.log(selectedDrinks);
  };
  const formik = useFormik({
    initialValues: {
      ID_DoUong: selectedDrinks || '',
      TenDoUong: currentID.TenDoUong || '',
      ID_NhanVien: user.ID_TaiKhoan || '',
      GiaDoUong: needEdit.Gia || '',
    },
    validationSchema: Yup.object({
      GiaDoUong: Yup.number().required('Giá không thể để trống'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_GiaDoUong: parseInt(name, 10),
        ID_DoUong: selectedDrinks,
        ID_NhanVien: user.ID_TaiKhoan,
        Gia: parseInt(values.GiaDoUong, 10),
      };
      updateDrinksPrice(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getDrinksPrice(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Cập Nhật Thông Tin Thành Công', severity: 'success' });
          } else {
            setNotification({ open: true, message: `Lỗi: Trùng Thông Tin`, severity: 'error' });
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
        <title> Edit Drinks | The Coffee </title>
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
              Lưu thay đổi
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditDrinksPrice;
