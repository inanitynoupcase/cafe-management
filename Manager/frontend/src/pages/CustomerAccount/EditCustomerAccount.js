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
import { updateCustomerAccount, getCustomerAccount } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditCustomerAccount = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/customeraccount');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();

  const customerInfoList = useSelector((state) => state.users.customerinfo.allCustomerInfo);
  const [infoList, infoList1] = customerInfoList;
  const select = infoList.map(({ idKhachHang, HoTen }) => ({ idKhachHang, HoTen }));

  const customerAccountList = useSelector((state) => state.users.customeraccount.allCustomerAccount);
  const [test, test1] = customerAccountList;
  const needEdit = test.find((khachHang) => khachHang.idTaiKhoan === parseInt(name, 10));
  const trangThai = needEdit.trangThai === 'Đang hoạt động' ? 1 : 2;

  const currentID = infoList.find((khachHang) => khachHang.HoTen === needEdit.Hoten);
  const [selectedCustomer, setSelectedCustomer] = useState(currentID.idKhachHang);
  const handleCustomerSelect = (event) => {
    setSelectedCustomer(event.target.value);
    console.log(selectedCustomer);
  };
  const formik = useFormik({
    initialValues: {
      TenTaiKhoan: needEdit.TenTaiKhoan || '',
      MatKhau: '',
      ID_KhachHang: selectedCustomer,
      TrangThai: trangThai || '',
    },
    validationSchema: Yup.object({
      TenTaiKhoan: Yup.string().required('Tên tài khoản không được để trống'),
      MatKhau: Yup.string().required('Mật khẩu không được để trống'),
      TrangThai: Yup.number().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_TaiKhoan: parseInt(name, 10),
        TenTaiKhoan: values.TenTaiKhoan,
        MatKhau: values.MatKhau,
        ID_KhachHang: selectedCustomer,
        TrangThai: values.TrangThai,
      };
      updateCustomerAccount(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getCustomerAccount(user.accessToken, dispatch, axiosJWT);
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
        <title> Edit Customer Account | The Coffee </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Back
          </Button>
          <h1>Edit Customer account</h1>
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
                onChange={handleCustomerSelect}
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
              Lưu Thay Đổi Tài Khoản Khách Hàng
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditCustomerAccount;
