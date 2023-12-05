import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import AddressForm from './AddressForm'
import Review from './Review'
import { createOrder } from '../../apiRequest'
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        The Coffee
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Checkout() {
  const steps = ['Hoàn thiện thông tin', 'Review']
  const [formType, setFormType] = useState('here')
  const [addressValue, setAddressValue] = useState('')
  const [noteValue, setNoteValue] = useState('')
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            onFormTypeSelect={setFormType}
            onFormAddressValue={setAddressValue}
            onFormNoteValue={setNoteValue}
          />
        )
      case 1:
        return (
          <Review
            formType={formType}
            addressValue={addressValue}
            noteValue={noteValue}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  console.log('checkoutForm: ', addressValue, noteValue)

  const handlePayment = async () => {
    try {
      // Lấy thông tin đồ uống từ localStorage
      const cartItems = JSON.parse(localStorage.getItem('carts'))

      const idAndCountList = cartItems.map(item => ({
        ID_DoUong: item.ID_DoUong,
        SoLuong: item.count
      }))

      // Lấy thông tin khách hàng từ sessionStorage
      const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
      console.log(loggedInUser.ID_KhachHang, loggedInUser.SDTKH)
      const idThanhToan = formType === 'here' ? 1 : 2

      // Tạo dữ liệu đơn hàng từ thông tin trên
      const orderData = {
        ID_KhachHang: loggedInUser.ID_KhachHang,
        ID_ThanhToan: idThanhToan, // Thay bằng ID phương thức thanh toán tương ứng
        ID_NhanVien: null, // Thay bằng ID nhân viên nếu có
        DiaChi: addressValue,
        SDT: loggedInUser.SDTKH,
        DoUongList: idAndCountList // Danh sách đồ uống từ carts
      }

      // Gọi hàm createOrder để tạo đơn hàng
      const response = await createOrder(orderData)

      // Log kết quả từ server
      localStorage.removeItem('carts')
      setActiveStep(activeStep + 1)

      // Xóa thông tin trong localStorage (đơn hàng đã được tạo)
      // localStorage.removeItem('carts')
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: t => `1px solid ${t.palette.divider}`
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link color="inherit" href="/">
              The Coffee Shop
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Đặt món
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {formType === 'here' ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Cảm ơn bạn đã đặt đồ uống
                  </Typography>
                  <Typography variant="subtitle1">
                    Bạn vui lòng đợi nhân viên làm đồ uống và trạng thái đồ uống
                    sẽ được cập nhật trong lịch sử đơn hàng của bạn.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Cảm ơn bạn đã đặt đồ uống
                  </Typography>
                  <Typography variant="subtitle1">
                    Shipper đang chuẩn bị đồ uống để ship đến bạn ngay đây. Bạn
                    có thể theo dõi đơn hàng trong lịch sử đơn hàng của mình.
                  </Typography>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay Lại
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handlePayment : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Đặt món' : 'Tiếp theo'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  )
}
