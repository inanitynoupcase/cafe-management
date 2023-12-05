import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountProfile from '../components/accountProfile'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { Button, Container, Stack, Typography } from '@mui/material'
const Profile: React.FC = () => {
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
            HỒ SƠ CÁ NHÂN
          </Typography>
        </Stack>
        <AccountProfile />
      </Container>
    </>
  )
}
export default Profile
