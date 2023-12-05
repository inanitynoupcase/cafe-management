import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { users, userdata } from '../data'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login, register } from '../apiRequest'
import {
  Stack,
  Button,
  TextField,
  Paper,
  Container,
  Typography
} from '@mui/material'

interface Props {
  accountOpen: boolean
  setAccountOpen: (value: boolean) => void
}

interface User {
  ID_TaiKhoan: number
  TenTaiKhoan: string
  MatKhau: string
  ID_KhachHang: number
  TrangThai: number
}

interface NewUser {
  TenTaiKhoan: string
  MatKhau: string
  HoTen: string
  GioiTinh: boolean
  SDT: number
  NgaySinh: Date
  Email: string
}

const Accounts: React.FC<Props> = ({ accountOpen, setAccountOpen }) => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showLoggedInUser, setShowLoggedInUser] = useState(true)

  const [newUser, setNewUser] = useState({
    TenTaiKhoan: '',
    MatKhau: '',
    HoTen: '',
    GioiTinh: '',
    SDT: '',
    NgaySinh: '',
    Email: ''
  })
  useEffect(() => {
    // Kiểm tra nếu đã lưu thông tin người dùng trong sessionStorage
    const savedUser = sessionStorage.getItem('loggedInUser')
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser))
      setShowLoggedInUser(false)
    }
  }, [])

  const handleLoginClick = () => {
    setLoginOpen(true)
    setRegisterOpen(false)
    setAccountOpen(false)
  }

  const handleLogin = async () => {
    try {
      const response = await login(username, password) // Gửi yêu cầu đăng nhập đến API
      if (response.ID_TaiKhoan) {
        // Xử lý đăng nhập thành công
        console.log('Đăng nhập thành công!')
        setLoginOpen(false)
        setLoggedInUser(response)
        setShowLoggedInUser(true)

        toast.success('Đăng nhập thành công!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })

        // Lưu thông tin người dùng vào sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(response))

        // Tự động tắt thông báo sau 2 giây
        setTimeout(() => {
          console.log('chạy timeout')
          setShowLoggedInUser(false)
        }, 1000)

        // Thực hiện các hành động liên quan đến đăng nhập thành công, ví dụ như chuyển trang, lưu thông tin đăng nhập vào local storage, v.v.
      } else {
        // Xử lý đăng nhập thất bại
        console.log(response.error)
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error)
    }
  }

  const handleRegister = async () => {
    try {
      const response = await register(newUser) // Gọi hàm registerUser với dữ liệu newUser
      if (response === 200) {
        // Xử lý đăng ký thành công
        toast.success('Đăng ký thành công!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        // Thực hiện các hành động liên quan đến đăng ký thành công, ví dụ như chuyển trang, hiển thị thông báo, v.v.
      } else {
        // Xử lý đăng ký thất bại
        console.log(response)
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error)
    }
  }

  const handleCloseLoggedInUser = () => {
    setShowLoggedInUser(false)
  }
  const handleAccountProfile = () => {}
  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
    toast.success('Đăng xuất thành công!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  const handleRegisterClick = () => {
    setRegisterOpen(true)
    setLoginOpen(false)
    setAccountOpen(false)
  }
  return (
    <>
      <ToastContainer />
      <Container1
        variants={cartsVariants}
        initial={false}
        animate={accountOpen ? 'expended' : 'collapsed'}
        transition={{ type: 'tween', duration: 0.25 }}
      >
        <AccountWrapper>
          <AnimatePresence>
            {loggedInUser ? (
              <>
                {/* Hiển thị thông tin cá nhân */}
                <Text
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline-block' }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <Link to="/user/profile">
                    <Type>Hồ sơ cá nhân</Type>
                  </Link>
                </Text>
                {/* Hiển thị lịch sử đơn hàng */}
                <Text
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline-block' }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <Link to="/user/orderhistory">
                    <Type>Lịch sử đơn hàng</Type>
                  </Link>
                </Text>
                {/* Hiển thị nút đăng xuất */}
                <Text
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline-block' }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <Link to="#" onClick={handleLogout}>
                    <Type>Đăng xuất</Type>
                  </Link>
                </Text>
              </>
            ) : (
              <>
                {/* Hiển thị nút đăng nhập */}
                <Text
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline-block' }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <Link to="#" onClick={handleLoginClick}>
                    <Type>Đăng Nhập</Type>
                  </Link>
                </Text>
                {/* Hiển thị nút đăng ký */}
                <Text
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'inline-block' }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <Link to="#" onClick={handleRegisterClick}>
                    <Type>Đăng Ký</Type>
                  </Link>
                </Text>
              </>
            )}
          </AnimatePresence>
        </AccountWrapper>
      </Container1>
      {loginOpen && (
        <Backdrop>
          <StyledContainer>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Đăng Nhập
              </Typography>
              <form>
                <Stack spacing={2}>
                  <TextField
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Đăng Nhập
                  </Button>
                  <Text>
                    Chưa có tài khoản?{' '}
                    <Link to="#" onClick={handleRegisterClick}>
                      Đăng kí ngay
                    </Link>
                  </Text>

                  <CloseButton onClick={() => setLoginOpen(false)} />
                </Stack>
              </form>
            </StyledPaper>
          </StyledContainer>
        </Backdrop>
      )}
      {showLoggedInUser && loggedInUser && (
        <Backdrop>
          <LoggedInUserContainer>
            <p>Xin chào {loggedInUser.HoTenKH}!</p>
            <CloseButton onClick={handleCloseLoggedInUser} />
          </LoggedInUserContainer>
        </Backdrop>
      )}
      {registerOpen && (
        <Backdrop>
          <StyledContainer>
            <StyledPaper>
              <Typography variant="h4" gutterBottom>
                Đăng Ký
              </Typography>
              <form>
                <Stack spacing={2}>
                  <TextField
                    placeholder="Tên tài khoản"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newUser.TenTaiKhoan}
                    onChange={e =>
                      setNewUser({ ...newUser, TenTaiKhoan: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Mật khẩu"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={newUser.MatKhau}
                    onChange={e =>
                      setNewUser({ ...newUser, MatKhau: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Họ và tên"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newUser.HoTen}
                    onChange={e =>
                      setNewUser({ ...newUser, HoTen: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Giới tính"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newUser.GioiTinh}
                    onChange={e =>
                      setNewUser({ ...newUser, GioiTinh: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Số điện thoại"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newUser.SDT}
                    onChange={e =>
                      setNewUser({ ...newUser, SDT: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Ngày tháng năm sinh"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newUser.NgaySinh}
                    onChange={e =>
                      setNewUser({ ...newUser, NgaySinh: e.target.value })
                    }
                  />
                  <TextField
                    placeholder="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={newUser.Email}
                    onChange={e =>
                      setNewUser({ ...newUser, Email: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                  >
                    Đăng Ký
                  </Button>
                </Stack>

                <Text>
                  Bạn đã có tài khoản?{' '}
                  <Link to="#" onClick={handleLoginClick}>
                    Đăng nhập ngay
                  </Link>
                </Text>
              </form>

              <CloseButton onClick={() => setRegisterOpen(false)} />
            </StyledPaper>
          </StyledContainer>
        </Backdrop>
      )}
    </>
  )
}
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const StyledPaper = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
`

const Container1 = styled(motion.section)`
  z-index: 2;
  width: 100%;
  max-width: 10rem;
  padding: 1rem;
  position: fixed;
  top: 4rem;
  right: 5rem;
  background-color: #f8f4ed;
  border-radius: 5px;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  transform-origin: top right;
`

const AccountWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 1.5rem;
  margin-bottom: 1rem;
  max-height: 45rem;
`

const Type = styled.div`
  color: black;
  &:hover {
    color: #757575;
  }
  &:visited {
    color: black;
  }
`

const cartsVariants = {
  expended: {
    opacity: 1,
    scale: 1,
    display: 'inline-block'
  },
  collapsed: {
    opacity: 0,
    scale: 0.9,
    transitionEnd: {
      display: 'none'
    }
  }
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 1;
`

const LoginContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const LoginInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: blue;
  }
`

const RegisterInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: blue;
  }
`

const LoginButton = styled.button`
  background-color: Green;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`
const LoggedInUserContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const RegisterContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const RegisterHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 0.1rem;
  right: 0.5rem;
  font-size: 1.5rem;
  color: #ccc;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const Text = styled(motion.p)`
  grid-column: 2 span;
  text-align: center;
  font-weight: 500;
  & a {
    display: inline-block;
    color: #525252;
    text-decoration: none;
  }
`
export default Accounts
