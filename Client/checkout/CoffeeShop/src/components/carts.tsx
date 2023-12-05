import React from 'react'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { ICard, Drinks } from '../colors'
import { Color, Info } from './cards'
import { theme } from '../theme'
import { drinks } from '../data'
import { Link } from 'react-router-dom'

interface Props {
  carts: Drinks[]
  cartOpen: boolean
  deleteCart: (cart: Drinks) => void
}

const Carts: React.FC<Props> = ({ carts, cartOpen, deleteCart }) => {
  const total = carts.reduce(
    (sum, { Gia, count }) => sum + Gia * (count || 0),
    0
  )
  const isCartEmpty = carts.length === 0
  const isLoggedIn = sessionStorage.getItem('loggedInUser')
  return (
    <>
      <Container
        variants={cartsVariants}
        initial={false}
        animate={cartOpen ? 'expended' : 'collapsed'}
        transition={{ type: 'tween', duration: 0.25 }}
      >
        <CartWrapper>
          <AnimatePresence>
            {carts.length ? (
              carts.map((cart, i) => (
                <Cart
                  key={cart.ID_DoUong}
                  variants={cartVariants}
                  initial={(i + 1) % 2 === 0 ? 'even' : 'odd'}
                  exit={(i + 1) % 2 === 0 ? 'even' : 'odd'}
                  transition={{ type: 'spring', stiffness: 50, duration: 0.4 }}
                  animate="visible"
                >
                  <Color image={cart.HinhAnh} />
                  <CartInfo>
                    <h4>
                      {cart.TenDoUong
                        ? cart.TenDoUong[0].toUpperCase() +
                          cart.TenDoUong.substring(1)
                        : ''}
                      <span>x{cart.count}</span>
                    </h4>
                    <p>{cart.Gia} VND</p>

                    <Close onClick={() => deleteCart(cart)}>&times;</Close>
                  </CartInfo>
                </Cart>
              ))
            ) : (
              <Text
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: 1, display: 'inline-block' }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                Giỏ Hàng Trống
              </Text>
            )}
          </AnimatePresence>
        </CartWrapper>

        <Total>
          Tổng <span>{total} VND</span>
        </Total>
        {isLoggedIn ? ( // Kiểm tra nếu đã đăng nhập
          <Link to="/checkout">
            <Checkout disabled={isCartEmpty}>Đặt hàng ngay</Checkout>
          </Link>
        ) : (
          <Text>Vui lòng đăng nhập</Text> // Hiển thị thông báo đăng nhập
        )}
      </Container>
    </>
  )
}

const Container = styled(motion.section)`
  z-index: 2;
  width: 100%;
  max-width: 380px;
  padding: 1rem;
  position: fixed;
  top: 75px;
  right: 20px;
  background-color: #f8f4ed;
  border-radius: 5px;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  transform-origin: top right;
`

const CartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 1.5rem;
  margin-bottom: 1rem;
  max-height: 45rem;
  overflow-x: hidden;
  overflow-y: auto;
`

const Text = styled(motion.p)`
  grid-column: 2 span;
  text-align: center;
  font-weight: 500;
  color: #525252;
`

const Cart = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const CartInfo = styled(Info)`
  width: 100%;
  margin-top: 0.5rem;
  flex-direction: row;
  align-items: center;

  h4 {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      color: #818181;
      font-weight: 600;
      font-size: 75%;
    }
  }

  p {
    color: #818181;
    text-transform: uppercase;
  }
`

const Close = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.4rem 0.6rem;
  position: absolute;
  right: 0;
  top: 0;
  color: #e5e5e5;
  background-color: #0e0d0f;
  border-top-right-radius: 5px;
  cursor: pointer;
`

const Total = styled.h5`
  font-weight: 700;
  text-transform: uppercase;
  color: #525252;
  padding: 1rem 0;
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -1rem;
    left: -1rem;
    height: 1px;
    background-color: rgb(210, 220, 220);
  }

  span {
    flex: 1;
    text-align: right;
    font-size: 90%;
  }
`

const Checkout = styled.button`
  width: 100%;
  color: #e5e5e5;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  background-color: #38b2ac;
  border-radius: 5px;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  border: none;

  &:hover {
    box-shadow: 0 0px 2px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  }

  &:active {
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.4);
    transform: translateY(1px);
  }
  &:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
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

const cartVariants = {
  odd: {
    x: -10,
    opacity: 0,
    transition: { type: 'tween', duration: 0.4 }
  },
  even: {
    x: 10,
    opacity: 0,
    transition: { type: 'tween', duration: 0.4 }
  },
  visible: {
    x: 0,
    opacity: 1
  }
}

export default Carts
