import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_

import {
  getAllUsers,
  getStaffAccount,
  getStaffInfo,
  getCustomerAccount,
  getCustomerInfo,
  getCategories,
  getDrinksInfo,
  getDrinksPrice,
  getOrders,
  getOrdersDetail,
  logout,
} from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess, logoutSuccess } from '../../../redux/authSlice';
import account from '../../../_mock/account';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: 'eva:home-fill',
  // },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
  // {
  //   label: 'Change Password',
  //   icon: 'eva:change-password-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const axiosJWTlogout = createAxios(user, dispatch, logoutSuccess);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    navigate('/profile');
  };

  const handleLogOut = () => {
    logout(dispatch, navigate, user.ID_TaiKhoan, user.accessToken, axiosJWTlogout);
  };
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user?.accessToken) {
      getAllUsers(user.accessToken, dispatch, axiosJWT);
      getStaffAccount(user.accessToken, dispatch, axiosJWT);
      getStaffInfo(user.accessToken, dispatch, axiosJWT);
      getCustomerAccount(user.accessToken, dispatch, axiosJWT);
      getCustomerInfo(user.accessToken, dispatch, axiosJWT);
      getCategories(user.accessToken, dispatch, axiosJWT);
      getDrinksInfo(user.accessToken, dispatch, axiosJWT);
      getDrinksPrice(user.accessToken, dispatch, axiosJWT);
      getOrders(user.accessToken, dispatch, axiosJWT);
      getOrdersDetail(user.accessToken, dispatch, axiosJWT);
    }
  }, [user]);
  // const [name, number] = useSelector((state) => state.users?.currentstaffinfo.onlyCurrentstaffinfo);
  // console.log(name[0].HoTen);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.HoTenNV}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {/* {account.displayName} */}
            {user?.TenTaiKhoan}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.ID_ChucVu === 1 ? 'Admin' : user?.ID_ChucVu === 2 ? 'Quản Lý' : 'Nhân Viên'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
