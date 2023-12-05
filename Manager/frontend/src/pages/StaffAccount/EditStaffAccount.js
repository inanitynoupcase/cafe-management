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
import { updateStaffAccount, getStaffAccount } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const EditStaffAccount = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleBack = () => {
    navigate('/dashboard/staffaccount');
  };
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { name } = useParams();

  const staffInfoList = useSelector((state) => state.users.staffinfo.allStaffInfo);
  const [infoList, infoList1] = staffInfoList;
  const select = infoList.map(({ idNhanVien, HoTen }) => ({ idNhanVien, HoTen }));

  const staffAccountList = useSelector((state) => state.users.staffaccount.allStaffAccount);
  const [test, test1] = staffAccountList;
  const needEdit = test.find((nhanVien) => nhanVien.idTaiKhoan === parseInt(name, 10));
  const ChucVu = needEdit.TenChucVu === 'Admin' ? '1' : needEdit.TenChucVu === 'Nhân Viên' ? '3' : '2';

  const currentID = infoList.find((nhanVien) => nhanVien.HoTen === needEdit.Hoten);
  const [selectedStaff, setSelectedStaff] = useState(currentID.idNhanVien);
  const handleStaffSelect = (event) => {
    setSelectedStaff(event.target.value);
    console.log(selectedStaff);
  };
  const formik = useFormik({
    initialValues: {
      TenTaiKhoan: needEdit.TenTaiKhoan || '',
      MatKhau: '',
      ID_NhanVien: selectedStaff,
      ID_ChucVu: ChucVu || '',
    },
    validationSchema: Yup.object({
      TenTaiKhoan: Yup.string().required('Tên tài khoản không được để trống'),
      MatKhau: Yup.string().required('Mật khẩu không được để trống'),
      ID_ChucVu: Yup.number().required('Chọn chức vụ'),
    }),
    onSubmit: (values) => {
      const editUser = {
        ID_TaiKhoan: parseInt(name, 10),
        TenTaiKhoan: values.TenTaiKhoan,
        MatKhau: values.MatKhau,
        ID_NhanVien: selectedStaff,
        ID_ChucVu: values.ID_ChucVu,
      };
      updateStaffAccount(user.accessToken, dispatch, editUser, axiosJWT)
        .then((statusCode) => {
          console.log('statusCode: ', statusCode);
          if (statusCode === 200) {
            getStaffAccount(user.accessToken, dispatch, axiosJWT);
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
        <title> Edit Staff Account | The Coffee </title>
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
              Lưu Thay Đổi Tài Khoản Nhân Viên
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditStaffAccount;
