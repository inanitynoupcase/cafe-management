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
import { format } from 'date-fns';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { deleteStaffInfo, getStaffInfo } from '../redux/apiRequest';
import { loginSuccess } from '../redux/authSlice';
import { createAxios } from '../createInstance';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idNhanVien', label: 'ID Nhân Viên', alignRight: false },
  { id: 'HoTen', label: 'Họ và Tên', alignRight: false },
  { id: 'NgaySinh', label: 'Ngày Sinh', alignRight: false },
  { id: 'GioiTinh', label: 'Giới Tính', alignRight: false },
  { id: 'DiaChi', label: 'Địa Chỉ', alignRight: false },
  { id: 'SDT', label: 'SĐT', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'CCCD', label: 'CCCD', alignRight: false },
  { id: 'trangThai', label: 'Trạng Thái', alignRight: false },
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

export default function StaffInfo() {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const staffInfoList = useSelector((state) => state.users.staffinfo.allStaffInfo);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('idNhanVien');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredUsers, totalUsers] = applySortFilter(staffInfoList, getComparator(order, orderBy), filterName);
  // const nhanVien1031 = filteredUsers.find((nhanVien) => nhanVien.idNhanVien === 1031);
  // console.log(nhanVien1031);
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
      const newSelecteds = filteredUsers.map((n) => n.idNhanVien);
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
    navigate('/dashboard/staffinfo/new');
    // console.log(navigate('/edit'));
  };

  const handleEdit = (event, name) => {
    navigate(`/dashboard/staffinfo/edit/${name}`);

    const [test, test1] = staffInfoList;
    console.log(test);
    const needEdit = test.find((nhanVien) => nhanVien.idNhanVien === name);
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedStaffInfo, setDeletedStaffInfo] = useState(null);

  const handleDelete = async (event, idNhanVien) => {
    setIsDeleting(true);
    try {
      // Gọi hàm xóa nhân viên và lấy kết quả trạng thái của request (status code)
      const statusCode = await deleteStaffInfo(user.accessToken, dispatch, idNhanVien, axiosJWT);

      // Nếu xóa thành công (statusCode === 200), cập nhật state deletedStaffInfo để tải lại dữ liệu
      if (statusCode === 200) {
        setDeletedStaffInfo(idNhanVien);
        setNotification({ open: true, message: 'Xóa nhân viên thành công', severity: 'success' });
      }
    } catch (err) {
      console.log('Lỗi xóa nhân viên:', err);
      setNotification({ open: true, message: `Lỗi xóa nhân viên:`, severity: 'error' });
    }

    setIsDeleting(false); // Kết thúc xóa (dù thành công hay không)
  };

  useEffect(() => {
    if (deletedStaffInfo !== null) {
      // Gọi hàm lấy dữ liệu nhân viên ở đây để tải lại bảng
      // Ví dụ:
      getStaffInfo(user.accessToken, dispatch, axiosJWT);

      // Sau khi đã tải lại dữ liệu, đặt deletedStaffInfo về null để tránh việc lặp vô hạn
      setDeletedStaffInfo(null);
    }
  }, [deletedStaffInfo]);

  // console.log(staffInfoList.find((row) => row.idNhanVien === idNhanVien));
  const handleTable = () => {
    console.log();
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = format(date, 'dd/MM/yyyy');
    return formattedDate;
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
        <title> Staff Information | The Coffee </title>
      </Helmet>
      {user.ID_ChucVu === 3 ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Staff Information
            </Typography>
          </Stack>

          <Card>
            <TableContainer
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      <Typography variant="body1" align="center">
                        Bạn không có quyền truy cập vào thông tin nhân viên.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Staff Information
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNew}>
              New Staff Information
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
                      const { idNhanVien, HoTen, NgaySinh, GioiTinh, DiaChi, SDT, Email, CCCD, trangThai } = row;
                      const selectedUser = selected.indexOf(idNhanVien) !== -1;

                      return (
                        <TableRow
                          hover
                          key={idNhanVien}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                          onClick={handleTable}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, idNhanVien)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {idNhanVien}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{HoTen}</TableCell>
                          <TableCell align="left">{formatDate(NgaySinh)}</TableCell>
                          <TableCell align="left">{GioiTinh}</TableCell>
                          <TableCell align="left">{DiaChi}</TableCell>
                          <TableCell align="left">{SDT}</TableCell>
                          <TableCell align="left">{Email}</TableCell>
                          <TableCell align="left">{CCCD}</TableCell>
                          <TableCell align="left">{trangThai}</TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="warning" onClick={(event) => handleEdit(event, idNhanVien)}>
                              <Iconify icon={'eva:edit-fill'} />
                            </IconButton>
                            <IconButton size="large" color="error" onClick={(event) => handleDelete(event, idNhanVien)}>
                              <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
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
      )}
    </>
  );
}
