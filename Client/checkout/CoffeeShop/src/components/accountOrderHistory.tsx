import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse
} from '@mui/material'
import { order, orderdetail } from '../data'
import 'react-toastify/dist/ReactToastify.css'
import { getOrderByIdKhachHang, getOrderDetailByIdDonHang } from '../apiRequest'

const AccountOrderHistory: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)

  const loggedInUserJSON = sessionStorage.getItem('loggedInUser')
  const loggedInUser = JSON.parse(loggedInUserJSON)

  const drinksJSON = sessionStorage.getItem('allDrinks')
  const drinks = JSON.parse(drinksJSON)
  const ID_KhachHang = loggedInUser.ID_KhachHang
  const [orderWDetail, setOrderWDetail] = useState([])
  // const [orderrDetail, setorderrDetail] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderReponse = await getOrderByIdKhachHang(ID_KhachHang)
        const ID_DonHangList = orderReponse.map(donHang => donHang.ID_DonHang)
        const orderDetailsPromises = ID_DonHangList.map(async ID_DonHang => {
          const orderDetailResponse = await getOrderDetailByIdDonHang(
            ID_DonHang
          )
          return orderDetailResponse
        })

        // Chờ tất cả các yêu cầu API getOrderDetailByIdDonHang hoàn thành
        const orderDetails = await Promise.all(orderDetailsPromises)

        // Đối với mỗi đơn hàng, lưu trữ chi tiết đơn hàng tương ứng vào đối tượng đơn hàng
        const ordersWithDetails = orderReponse.map((donHang, index) => {
          return {
            ...donHang,
            chiTietDonHang: orderDetails[index]
          }
        })

        console.log(ordersWithDetails)
        setOrderWDetail(ordersWithDetails)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  console.log(orderWDetail)
  const handleSelectOrder = (orderID: number) => {
    if (selectedOrder === orderID) {
      setSelectedOrder(null)
    } else {
      setSelectedOrder(orderID)
    }
  }

  const renderOrderDetails = (orderID: number, orderDetails: any[]) => (
    <TableRow>
      <TableCell colSpan={5}>
        <Collapse in={selectedOrder === orderID}>
          <div>
            <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Chi tiết đơn hàng:
            </h3>
            <Table>
              <TableBody>
                {orderDetails.map((detail: any) => {
                  const drinkInfo = drinks.find(
                    drink => drink.ID_DoUong === detail.ID_DoUong
                  )
                  return (
                    <TableRow key={detail.ID_CTDonHang}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell></TableCell>

                      <TableCell
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <p>Tên nước uống:</p>
                          <p>Giá:</p>
                          <p>Số lượng:</p>
                        </div>
                        <div>
                          <p>{drinkInfo ? drinkInfo.TenDoUong : 'N/A'}</p>
                          <p>{detail.GiaDoUong} VND</p>
                          <p>{detail.SoLuong}</p>
                        </div>
                      </TableCell>
                      <TableCell></TableCell>

                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID đơn hàng</TableCell>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>Ngày đặt</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderWDetail.map((orderItem: any) => (
            <React.Fragment key={orderItem.ID_DonHang}>
              <TableRow>
                <TableCell>{orderItem.ID_DonHang}</TableCell>
                <TableCell>{orderItem.TongTien} VND</TableCell>
                <TableCell>{orderItem.NgayDat}</TableCell>
                <TableCell>{orderItem.TrangThai}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleSelectOrder(orderItem.ID_DonHang)}
                  >
                    Chi tiết đơn hàng
                  </Button>
                </TableCell>
              </TableRow>
              {renderOrderDetails(
                orderItem.ID_DonHang,
                orderItem.chiTietDonHang
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default AccountOrderHistory
