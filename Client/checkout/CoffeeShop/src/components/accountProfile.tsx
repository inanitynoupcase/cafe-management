import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Typography, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'

const AccountProfile: React.FC = () => {
  const theme = useTheme()

  const loggedInUserJSON = sessionStorage.getItem('loggedInUser')
  const loggedInUser = JSON.parse(loggedInUserJSON)

  if (!loggedInUser) {
    return <div>Không tìm thấy thông tin người dùng!</div>
  }
  return (
    <ProfileContainer elevation={3}>
      <ProfileTitle variant="h4"></ProfileTitle>
      <ProfileText>Họ và tên: {loggedInUser.HoTenKH}</ProfileText>

      <ProfileText>Ngày sinh: {loggedInUser.NgaySinhKH}</ProfileText>
      <ProfileText>
        Giới tính: {loggedInUser.GioiTinhKH ? 'Nam' : 'Nữ'}
      </ProfileText>
      <ProfileText>Số điện thoại: {loggedInUser.SDTKH}</ProfileText>
      <ProfileText>Email: {loggedInUser.EmailKH}</ProfileText>
    </ProfileContainer>
  )
}

const ProfileContainer = styled(Paper)`
  padding: 16px;
  margin-top: 16px;
`

const ProfileTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
`

const ProfileText = styled(Typography)`
  margin-bottom: 8px;
`
export default AccountProfile
