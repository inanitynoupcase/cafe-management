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
  Card,
  CardContent,
  CardMedia,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateDrinksInfo, getDrinksInfo } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditDrinksInfo = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/drinksInfo');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();
  const drinksInfoList = useSelector((state) => state.drinks.drinksinfo.allDrinksInfo);
  const [drinks, drinks1] = drinksInfoList;
  const needEdit = drinks.find((doUong) => doUong.idDoUong === parseInt(name, 10));

  const categoriesList = useSelector((state) => state.drinks.categories.allCategories);
  const [test, test1] = categoriesList;

  const select = test.map(({ idDanhMuc, TenDanhMuc }) => ({ idDanhMuc, TenDanhMuc }));
  const currentID = test.find((doUong) => doUong.TenDanhMuc === needEdit.TenDanhMuc);

  const [selectedCategories, setSelectedCategories] = useState(currentID.idDanhMuc);
  const status = needEdit.trangThai === 'Đang hoạt động' ? 1 : 2;
  const handleCategoriesSelect = (event) => {
    setSelectedCategories(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      ID_DanhMuc: selectedCategories || '',
      TenDoUong: needEdit.TenDoUong || '',
      HinhAnh: needEdit.HinhAnh || '',
      MoTa: needEdit.MoTa || '',
      TrangThai: status || '',
    },
    validationSchema: Yup.object({
      TenDoUong: Yup.string().required('Tên đồ uống không được để trống'),
      HinhAnh: Yup.string().required('Link hình ảnh đồ uống không được để trống'),
      TrangThai: Yup.number().required('Trạng thái không được để trống'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_DoUong: parseInt(name, 10),
        ID_DanhMuc: selectedCategories,
        TenDoUong: values.TenDoUong,
        HinhAnh: values.HinhAnh,
        MoTa: values.MoTa,
        TrangThai: values.TrangThai,
      };
      updateDrinksInfo(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getDrinksInfo(user.accessToken, dispatch, axiosJWT);
            setNotification({ open: true, message: 'Cập Nhật Thông Tin Thành Công', severity: 'success' });
          } else {
            setNotification({ open: true, message: `Lỗi: Đồ Uống đã tồn tại`, severity: 'error' });
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
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Drinks Information</h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="TenDoUong"
              label="Tên Đồ Uống"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.TenDoUong}
              onChange={formik.handleChange}
              error={formik.touched.TenDoUong && Boolean(formik.errors.TenDoUong)}
              helperText={formik.touched.TenDoUong && formik.errors.TenDoUong}
            />
            <FormControl fullWidth error={selectedCategories === ''}>
              <InputLabel id="Categories-select-label">Chọn Danh Mục</InputLabel>
              <Select
                labelId="taff-select-label"
                id="Categories-select"
                value={selectedCategories}
                label="Chọn Danh Mục"
                onChange={handleCategoriesSelect}
              >
                {select.map((categories) => (
                  <MenuItem key={categories.idDanhMuc} value={categories.idDanhMuc}>
                    {categories.TenDanhMuc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="MoTa"
              label="Mô tả"
              variant="outlined"
              fullWidth
              value={formik.values.MoTa}
              onChange={formik.handleChange}
            />
            <TextField
              name="HinhAnh"
              label="Link Hình Ảnh Danh Mục"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.HinhAnh}
              onChange={formik.handleChange}
              error={formik.touched.HinhAnh && Boolean(formik.errors.HinhAnh)}
              helperText={formik.touched.HinhAnh && formik.errors.HinhAnh}
              // InputLabelProps={{ shrink: true }}
            />
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
            {formik.values.HinhAnh && (
              <Card sx={{ maxWidth: 300, margin: 'auto' }}>
                <CardMedia component="img" image={formik.values.HinhAnh} alt="Hình ảnh xem trước" />
                <CardContent>
                  <p style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>Hình ảnh xem trước</p>
                </CardContent>
              </Card>
            )}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              lưu thay đổi
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditDrinksInfo;
