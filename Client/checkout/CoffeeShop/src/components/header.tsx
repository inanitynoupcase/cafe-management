import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Drinks } from '../colors'

interface Props {
  carts: Drinks[]
  toggleCart: () => void
  toggleAccount: () => void
}

const Header: React.FC<Props> = ({ carts, toggleCart, toggleAccount }) => {
  const { pathname } = useLocation()
  const cartCount = carts.reduce((sum, { count }) => sum + (count || 0), 0)

  return (
    <Nav>
      <Items>
        {/* <Item isActive={pathname === '/'}>
          <Link to="/">
            Home {pathname === '/' && <Underline layoutId="underline" />}
          </Link>
        </Item> */}

        <Item isActive={pathname === '/'}>
          <Link to="/">
            Menu {pathname === '/' && <Underline layoutId="underline" />}
          </Link>
        </Item>

        {/* <Item isActive={pathname === '/blog'}>
          <Link to="/blog">
            Blog {pathname === '/blog' && <Underline layoutId="underline" />}
          </Link>
      </Item>*/}
      </Items>
      <Account onClick={toggleAccount}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 4.8c1.99 0 3.6 1.61 3.6 3.6s-1.61 3.6-3.6 3.6-3.6-1.61-3.6-3.6 1.61-3.6 3.6-3.6zM12 20c-3.313 0-6.15-2.163-7.16-5.2C6.85 12.15 9.687 10 12 10s5.15 2.15 5.16 4.8c-1.008 3.038-3.845 5.2-7.16 5.2z" />
        </svg>
      </Account>
      <Cart onClick={toggleCart}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M7 22q-.825 0-1.412-.587Q5 20.825 5 20q0-.825.588-1.413Q6.175 18 7 18t1.412.587Q9 19.175 9 20q0 .825-.588 1.413Q7.825 22 7 22Zm10 0q-.825 0-1.412-.587Q15 20.825 15 20q0-.825.588-1.413Q16.175 18 17 18t1.413.587Q19 19.175 19 20q0 .825-.587 1.413Q17.825 22 17 22ZM6.15 6l2.4 5h7l2.75-5ZM5.2 4h14.75q.575 0 .875.512.3.513.025 1.038l-3.55 6.4q-.275.5-.738.775Q16.1 13 15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.988-.575-.987-.05-1.962L6.6 11.6 3 4H1V2h3.25Zm3.35 7h7Z" />
        </svg>
        <Circle>{cartCount}</Circle>
      </Cart>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  padding: 1.25rem;
  background-color: rgba(12, 12, 12, 0.74);
`

const Items = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`

const Item = styled.li<{ isActive: boolean }>`
  font-size: 1.1rem;
  a {
    position: relative;
    color: ${({ isActive }) =>
      isActive ? '#ffffff' : 'rgba(183, 176, 176, 0.74)'};
    text-decoration: none;
    transition: 0.2s;
  }
  a:hover {
    color: #ffffff;
  }
`

const Underline = styled(motion.span)`
  width: 100%;
  height: 4px;
  background-color: #38b2ac;
  border-radius: 10rem;
  position: absolute;
  margin-inline: 0;
  right: 0;
  left: 0;
  bottom: -8px;
`
const Account = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #38b2ac;
  border-radius: 50%;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  position: fixed;
  right: 5rem;
  top: 0.625rem;
  &:active {
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.4);
    transform: translateY(1px);
  }

  svg {
    fill: #fff;
  }
`
const Cart = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #38b2ac;
  border-radius: 50%;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  position: fixed;
  right: 1.25rem;
  top: 0.625rem;
  &:active {
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.4);
    transform: translateY(1px);
  }

  svg {
    fill: #fff;
  }
`

const Circle = styled.span`
  font-size: 70%;
  font-weight: 400;
  color: #fff;
  width: 1.2rem;
  height: 1.2rem;
  background-color: #f44250;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -6px;
  bottom: -6px;
  user-select: none;
`

export default Header
