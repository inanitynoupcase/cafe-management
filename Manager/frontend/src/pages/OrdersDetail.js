import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { deleteOrdersDetail, getOrdersDetail } from '../redux/apiRequest';
import { loginSuccess } from '../redux/authSlice';
import { createAxios } from '../createInstance';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idCTDonHang', label: 'ID CT Đơn hàng', alignRight: false },
  { id: 'idDonHang', label: 'ID Đơn Hàng', alignRight: false },
  { id: 'TenDoUong', label: 'Tên Đồ Uống', alignRight: false },
  { id: 'GiaDoUong', label: 'Giá Đồ Uống', alignRight: false },
  { id: 'SoLuong', label: 'Số Lượng', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.HoTen.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrdersDetail() {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const ordersDetailList = useSelector((state) => state.orders.ordersdetail.allOrdersDetail);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('idCTDonHang');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredUsers, totalUsers] = applySortFilter(ordersDetailList, getComparator(order, orderBy), filterName);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.idCTDonHang);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    console.log(selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  // const isNotFound = !filteredUsers.length && !!filterName;
  const handleNew = () => {
    navigate('/dashboard/ordersdetail/new');
    // console.log(navigate('/edit'));
  };

  const handleEdit = (event, name) => {
    navigate(`/dashboard/ordersdetail/edit/${name}`);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedOrdersDetail, setDeletedOrdersDetail] = useState(null);

  const handleDelete = async (event, idTaiKhoan) => {
    setIsDeleting(true);
    try {
      // Gọi hàm xóa nhân viên và lấy kết quả trạng thái của request (status code)
      const statusCode = await deleteOrdersDetail(user.accessToken, dispatch, idTaiKhoan, axiosJWT);

      // Nếu xóa thành công (statusCode === 200), cập nhật state deletedStaffInfo để tải lại dữ liệu
      if (statusCode === 200) {
        setDeletedOrdersDetail(idTaiKhoan);
        setNotification({ open: true, message: 'Xóa chi tiết đơn hàng thành công', severity: 'success' });
      }
    } catch (err) {
      console.log('Lỗi xóa tài khoản nhân viên:', err);
      setNotification({ open: true, message: `Lỗi chi tiết đơn hàng`, severity: 'error' });
    }

    setIsDeleting(false); // Kết thúc xóa (dù thành công hay không)
  };

  useEffect(() => {
    if (deletedOrdersDetail !== null) {
      // Gọi hàm lấy dữ liệu nhân viên ở đây để tải lại bảng
      // Ví dụ:
      getOrdersDetail(user.accessToken, dispatch, axiosJWT);

      // Sau khi đã tải lại dữ liệu, đặt deletedStaffInfo về null để tránh việc lặp vô hạn
      setDeletedOrdersDetail(null);
    }
  }, [deletedOrdersDetail]);
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      {' '}
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
        <title> Orders Detail | The Coffee </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders Detail
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNew}>
            New Orders Detail
          </Button>
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { idCTDonHang, idDonHang, TenDoUong, GiaDoUong, SoLuong } = row;
                    const selectedUser = selected.indexOf(idCTDonHang) !== -1;

                    return (
                      <TableRow hover key={idCTDonHang} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, idCTDonHang)} />
                        </TableCell>
                        <TableCell align="left">{idCTDonHang}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {idDonHang}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{TenDoUong}</TableCell>
                        <TableCell align="left">{GiaDoUong}</TableCell>
                        <TableCell align="left">{SoLuong}</TableCell>

                        <TableCell align="right">
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="warning"
                              onClick={(event) => handleEdit(event, idCTDonHang)}
                            >
                              <Iconify icon={'eva:edit-fill'} />
                            </IconButton>
                            <IconButton
                              size="large"
                              color="error"
                              onClick={(event) => handleDelete(event, idCTDonHang)}
                            >
                              <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
