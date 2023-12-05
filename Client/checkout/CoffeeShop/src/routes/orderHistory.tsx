import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AccountOrderHistory from '../components/accountOrderHistory'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'

import { Button, Container, Stack, Typography } from '@mui/material'

const OrderHistory: React.FC = () => {
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={4} // Giảm khoảng cách trên
          mb={4} // Giảm khoảng cách dưới
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 18 }} /> Quay lại
            </Button>
          </Link>
          <Typography variant="h4" fontWeight="bold">
            LỊCH SỬ ĐƠN HÀNG{' '}
          </Typography>
        </Stack>
        <AccountOrderHistory />
      </Container>
    </>
  )
}

export default OrderHistory
