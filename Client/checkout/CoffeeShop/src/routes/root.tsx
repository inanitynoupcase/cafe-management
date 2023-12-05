import React, { useCallback, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Header from '../components/header'
import Carts from '../components/carts'
import Accounts from '../components/accounts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Drinks } from '../colors'
import {
  isContains,
  checkLocalStorage,
  removeLocalCart,
  saveLocalCart
} from '../localStorage'

type IContext = { addToCart: (card: Drinks) => void }

export const useCustomContext = () => useOutletContext<IContext>()

const Root: React.FC = () => {
  const [carts, setCarts] = useState<Drinks[]>(checkLocalStorage())
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const addToCart = useCallback(
    (card: Drinks) => {
      setCarts(carts =>
        isContains(carts, card)
          ? carts.map(cart =>
              cart.ID_DoUong === card.ID_DoUong
                ? { ...card, count: cart.count && cart.count + 1 }
                : cart
            )
          : [...carts, { ...card, count: 1 }]
      )

      saveLocalCart(card)
      toast.success('Thêm vào giỏ hàng thành công', {
        position: 'top-right',
        autoClose: 500, // Thời gian tự động đóng thông báo (2 giây)
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false
      })
    },
    [carts]
  )

  const deleteCart = useCallback(
    (cart: Drinks) => {
      setCarts(carts => carts.filter(c => c.ID_DoUong !== cart.ID_DoUong))
      removeLocalCart(cart)
      toast.success('Xóa khỏi giỏ hàng thành công', {
        position: 'top-right',
        autoClose: 500, // Thời gian tự động đóng thông báo (2 giây)
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false
      })
    },
    [carts]
  )

  const toggleCart = () => {
    setCartOpen(cartOpen => !cartOpen)
  }

  const toggleAccount = () => {
    setAccountOpen(accountOpen => !accountOpen)
  }

  return (
    <>
      <ToastContainer />
      <Header
        carts={carts}
        toggleCart={toggleCart}
        toggleAccount={toggleAccount}
      />
      <Accounts accountOpen={accountOpen} setAccountOpen={setAccountOpen} />{' '}
      <Carts carts={carts} cartOpen={cartOpen} deleteCart={deleteCart} />
      <Outlet context={{ addToCart }} />
    </>
  )
}

export default Root
