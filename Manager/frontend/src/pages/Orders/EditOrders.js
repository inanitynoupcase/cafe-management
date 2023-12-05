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
import { updateOrders, getOrders } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditOrders = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/orders');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();

  const customerInfoList = useSelector((state) => state.users.customerinfo.allCustomerInfo);
  const [infoList, infoList1] = customerInfoList;
  const select = infoList.map(({ idKhachHang, HoTen }) => ({ idKhachHang, HoTen }));

  const ordersList = useSelector((state) => state.orders.orders.allOrders);
  console.log(ordersList);
  const [test, test1] = ordersList;
  const needEdit = test.find((donHang) => donHang.idDonHang === parseInt(name, 10));
  const trangThai = needEdit.trangThai === 'Đã hoàn thành' ? 1 : 2;

  const currentID = infoList.find((khachHang) => khachHang.HoTen === needEdit.TenKhachHang);
  const [selectedCustomer, setSelectedCustomer] = useState(currentID.idKhachHang);
  const handleCustomerSelect = (event) => {
    setSelectedCustomer(event.target.value);
    console.log(selectedCustomer);
  };
  const payment = needEdit.TenThanhToan === 'Tại Chỗ' ? 1 : 2;
  const status = needEdit.trangThai === 'Đã hoàn thành' ? 1 : 2;

  const formik = useFormik({
    initialValues: {
      ID_KhachHang: selectedCustomer || '',
      ID_ThanhToan: payment,
      ID_NhanVien: needEdit.ID_NhanVien,
      TongTien: needEdit.TongTien || '',
      NgayDat: needEdit.NgayDat || '',
      DiaChi: needEdit.DiaChi || '',
      SDT: needEdit.SDT || '',
      TrangThai: status || '',
    },
    validationSchema: Yup.object({
      ID_ThanhToan: Yup.number().required('Không được để trống'),
      TongTien: Yup.number().required('Không được để trống'),
      DiaChi: Yup.string().required('Tên tài khoản không được để trống'),
      SDT: Yup.string()
        .required('Số điện thoại không được để trống')
        .test('is-phone', 'Số điện thoại không hợp lệ', (value) => {
          const regex = /^[0-9]{10}$/;
          return regex.test(value);
        }),
      TrangThai: Yup.number().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_DonHang: parseInt(name, 10),
        ID_KhachHang: selectedCustomer,
        ID_ThanhToan: values.ID_ThanhToan,
        ID_NhanVien: user.ID_NhanVien,
        TongTien: values.TongTien,
        DiaChi: values.DiaChi,
        SDT: values.SDT,
        TrangThai: values.TrangThai,
      };
      updateOrders(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getOrders(user.accessToken, dispatch, axiosJWT);
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
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
          </Button>
          <h1>New Order </h1>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
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
              name="ID_ThanhToan"
              label="ID Thanh Toán"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.ID_ThanhToan}
              onChange={formik.handleChange}
              error={formik.touched.ID_ThanhToan && Boolean(formik.errors.ID_ThanhToan)}
              helperText={formik.touched.ID_ThanhToan && formik.errors.ID_ThanhToan}
            />
            <TextField
              name="TongTien"
              label="Tổng Tiền"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.TongTien}
              onChange={formik.handleChange}
              error={formik.touched.TongTien && Boolean(formik.errors.TongTien)}
              helperText={formik.touched.TongTien && formik.errors.TongTien}
            />
            <TextField
              name="DiaChi"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.DiaChi}
              onChange={formik.handleChange}
              error={formik.touched.DiaChi && Boolean(formik.errors.DiaChi)}
              helperText={formik.touched.DiaChi && formik.errors.DiaChi}
            />
            <TextField
              name="SDT"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.SDT}
              onChange={formik.handleChange}
              error={formik.touched.SDT && Boolean(formik.errors.SDT)}
              helperText={formik.touched.SDT && formik.errors.SDT}
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
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Tạo mới Đơn hàng
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditOrders;
