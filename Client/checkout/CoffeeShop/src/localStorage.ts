import { Drinks } from './colors'

export const checkLocalStorage = () => {
  const carts = localStorage.getItem('carts')
  if (carts !== null) {
    return JSON.parse(carts)
  }

  return []
}

export const isContains = (carts: Drinks[], cart: Drinks) =>
  carts.some(c => c.ID_DoUong === cart.ID_DoUong)

export const saveLocalCart = (cart: Drinks) => {
  let carts = checkLocalStorage() as Drinks[]
  isContains(carts, cart)
    ? (carts = carts.map(c =>
        c.ID_DoUong === cart.ID_DoUong
          ? { ...c, count: c.count && c.count + 1 }
          : c
      ))
    : carts.push({ ...cart, count: 1 })

  localStorage.setItem('carts', JSON.stringify(carts))
}

export const removeLocalCart = (cart: Drinks) => {
  let carts = checkLocalStorage() as Drinks[]
  carts = carts.filter(c => c.ID_DoUong !== cart.ID_DoUong)

  localStorage.setItem('carts', JSON.stringify(carts))
}
