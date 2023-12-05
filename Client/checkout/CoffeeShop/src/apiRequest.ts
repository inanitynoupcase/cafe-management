import axios, { AxiosResponse } from 'axios'

interface UserData {
  TenTaiKhoan: string
  HoTen: string
  GioiTinh: boolean
  SDT: string
  NgaySinh: string
  Email: string
  MatKhau: string
}
interface DoUong {
  ID_DoUong: number
  SoLuong: number
}

interface OrderData {
  ID_KhachHang: number
  ID_ThanhToan: number
  ID_NhanVien: number
  DiaChi: string
  SDT: string
  DoUongList: DoUong[]
}
export const getCategories = async () => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      'http://localhost:8000/client/getCategories'
    )
    const categories = response.data
    return categories
  } catch (error) {
    throw error
  }
}

export const getDrinks = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/client/getDrinks'
    )
    const drinks = response.data
    return drinks
  } catch (error) {
    console.error('Error fetching drinks:', error)
    throw error
  }
}

export const login = async (TenTaiKhoan: string, MatKhau: string) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'http://localhost:8000/client/login',
      { TenTaiKhoan, MatKhau }
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const register = async (userData: UserData) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'http://localhost:8000/client/register',
      userData
    )
    const statusCode = response.status
    return statusCode
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}
export const getOrderByIdKhachHang = async (ID_KhachHang: number) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'http://localhost:8000/client/getOrderByIDKH/',
      { ID_KhachHang }
    )
    const donHangList = response.data
    return donHangList
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export const getOrderDetailByIdDonHang = async (ID_DonHang: number) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'http://localhost:8000/client/getOrderDetailByIDDH/',
      { ID_DonHang }
    )
    const ctDonHangList = response.data
    return ctDonHangList
  } catch (error) {
    console.error('Error fetching order details:', error)
    throw error
  }
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'http://localhost:8000/client/createOrder',
      orderData
    )
    const message = response.data.message
    return message
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}
