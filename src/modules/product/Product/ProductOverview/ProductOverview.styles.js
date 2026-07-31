import styled from 'styled-components'
import sizes from 'theme/sizes'

export const ProductOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4%;

  @media ${sizes.lg} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

export const SmallImages = styled.div``

export const SmallImage = styled.div`
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;

  img {
    position: absolute;
    width: 100%;
    height: auto;
  }

  &::after {
    content: '';
    display: ${({ isCurrentImage }) => (isCurrentImage ? 'none' : 'block')};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0.15;
  }

  &:hover::after {
    opacity: 0;
  }
`

export const MainImage = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 5%;
  position: sticky;
  top: 65px;
`

export const ActionsContainer = styled.div`
  text-align: left;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 15px;
`

export const Policy = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0;

  span {
    max-width: 80px;
    margin-right: 25px;
    text-align: center;
    flex: 1 1 0;

    p {
      font-size: 1.2rem;
    }
  }
  .lazyload {
    padding-top: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }
`

export const CartBtn = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
`

export const Wishlist = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  width: fit-content;

  i {
    margin-right: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: blue;
  }

  p {
    font-size: 1.5rem;
    color: blue;
    cursor: pointer;
  }

  @media ${sizes.lg} {
    margin-bottom: 30px;
  }
`

export const Variants = styled.div`
  display: flex;
  margin: 15px 0;
`

export const Variant = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color};
  border: ${({ color }) => color === '#ffffff' && '0.5px solid #000000'};
  margin-right: 15px;
  cursor: pointer;
`
