import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import { Drinks } from '../../colors'
import { userdata } from '../../data'

type ReviewProps = {
  formType: string
  addressValue: string
  noteValue: string
}
export default function Review(props: ReviewProps) {
  const { formType, addressValue, noteValue } = props

  const loggedInUserJSON = sessionStorage.getItem('loggedInUser')
  const loggedInUser = JSON.parse(loggedInUserJSON)

  const carts = localStorage.getItem('carts')
  const doUongList: Drinks[] = carts ? JSON.parse(carts) : []
  const products = doUongList.map(doUong => ({
    name: doUong.TenDoUong,
    image: doUong.HinhAnh, // Thêm trường hình ảnh vào products
    price: `${doUong.Gia} VND`,
    count: doUong.count || 1
  }))

  const total = doUongList.reduce(
    (sum, { Gia, count }) => sum + Gia * (count || 0),
    0
  )

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tóm Tắt Đơn Hàng
      </Typography>

      <List disablePadding>
        {products.map(cart => (
          <ListItem key={cart.name} sx={{ py: 1, px: 0 }}>
            {/* Hiển thị hình ảnh (nhỏ) */}
            <img
              src={cart.image}
              alt={cart.name}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <ListItemText
              primary={cart.name}
              secondary={`Số lượng: ${cart.count}`}
            />
            <Typography variant="body2">{cart.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Hình Thức" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formType === 'here' ? 'Uống tại quán' : 'Ship tận nhà'}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tổng tiền" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total} VND
          </Typography>
        </ListItem>
      </List>

      {/* Hiển thị thông tin vận chuyển nếu chọn "Ship tại nhà" */}
      {/* Sử dụng biến 'formType' thay thế cho 'isAtShop' */}
      {formType === 'here' ? null : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Thông Tin Vận Chuyển
            </Typography>
            {/* Thay thế bằng thông tin tên, số điện thoại, địa chỉ và ghi chú của khách hàng */}
            <Typography gutterBottom>
              Tên Khách Hàng: {loggedInUser.HoTenKH}
            </Typography>
            <Typography gutterBottom>
              Số Điện Thoại: {loggedInUser.SDTKH}
            </Typography>
            <Typography gutterBottom>Địa Chỉ: {addressValue}</Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}
