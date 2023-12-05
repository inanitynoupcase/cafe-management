import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { colors } from '../colors'
import { theme } from '../theme'
import { useCustomContext } from '../routes/root'
// import { drinks, categorys } from '../data'
import { getCategories, getDrinks } from '../apiRequest'
import axios from 'axios' // Thêm import này

interface drink {
  ID_DoUong: number
  TenDoUong: string
  HinhAnh: string
  ID_DanhMuc: number
  HinhAnhDM: string
  Gia: number
  TrangThai: number
}
interface category {
  idDanhMuc: number
  TenDanhMuc: string
  HinhAnhDM: string
  NgayCN: string
}

const Cards: React.FC = () => {
  const { addToCart } = useCustomContext()
  const [categoryId, setCategoryId] = useState<number | null>(1) // Sử dụng useState để lưu giá trị ID_DanhMuc được chọn
  const [categories, setCategories] = useState<category[]>([])
  const [drinks, setDrinks] = useState<drink[]>([])
  const [selectedCategory, setSelectedCategory] = useState<category | null>(
    null
  )
  console.log(drinks)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories()
        const drinksResponse = await getDrinks()
        setCategories(categoriesResponse[0])
        setDrinks(drinksResponse[0])
        sessionStorage.setItem('allDrinks', JSON.stringify(drinksResponse[0]))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const filteredDrinks = selectedCategory
    ? drinks.filter(drink => drink.ID_DanhMuc === selectedCategory.idDanhMuc)
    : []
  return (
    <MainContainer>
      <Container1>
        {categories.map(category => (
          <CategoryButton
            key={category.idDanhMuc}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory?.idDanhMuc === category.idDanhMuc ? 'active' : ''
            }
          >
            <CategoryImage src={category.HinhAnhDM} alt={category.TenDanhMuc} />
            <CategoryName>{category.TenDanhMuc}</CategoryName>
          </CategoryButton>
        ))}
      </Container1>
      <Container2
        variants={{}}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: window.innerWidth >= 660 ? 0.1 : 0 }}
      >
        {filteredDrinks.map(drink => (
          <Card key={drink.ID_DoUong} variants={cardVariants}>
            <Color image={drink.HinhAnh} />
            <Overview>
              <Info>
                <h4>{drink.TenDoUong}</h4>
                <p>{drink.Gia} VND</p>
              </Info>
              <Add onClick={() => addToCart(drink)}>Đặt ngay</Add>
            </Overview>
          </Card>
        ))}
      </Container2>
    </MainContainer>
  )
}

const MainContainer = styled(motion.main)`
  display: block;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  padding: 2.2rem 4.5rem;
`

const Container1 = styled(motion.main)`
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  padding: 2.2rem 4.5rem;
`
const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.6rem 0.8rem;
  color: #fff;
  background-color: #38b2ac;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0px 2px hsla(0, 0%, 0%, 0.6), 0px 4px hsla(0, 0%, 0%, 0.6);
    transform: translateY(-1px);
  }

  &.active {
    color: #38b2ac;
    background-color: #fff;
  }
`

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`

const CategoryName = styled.span``

const Container2 = styled(motion.main)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 17rem));
  gap: 2rem;
  padding: 2.2rem 4.5rem;
`

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;

  & > p {
    font-weight: 400;
  }

  p {
    font-size: 70%;
    color: #818181;
    text-transform: uppercase;
  }
`

export const Color = styled.div<{ image: string }>`
  width: 100%;
  aspect-ratio: 7 / 5;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`

const Overview = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4,
  p {
    font-weight: 500;
  }
  p {
    font-size: 84%;
  }
`

const Add = styled.button`
  font-size: 1rem;
  padding: 0.6rem 0.8rem;
  color: #e5e5e5;
  border: none;
  background-color: #38b2ac;
  border-radius: 5px;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);

  &:hover {
    box-shadow: 0 0px 2px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  }

  &:active {
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.4);
    transform: translateY(1px);
  }
`

const cardVariants = {
  hidden: {
    y: 10,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: -10,
    opacity: 0
  }
}

export default Cards
