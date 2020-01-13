import styled from 'styled-components'

export const ProductItemContainer = styled.div`
  background: #F6F8FC;
  position: relative;

  img {
    width: 100%;
    cursor: pointer;
  }
`;

export const ItemBottom = styled.div`
  padding: 0 15px 15px 15px;
  text-align: left;

  h3 {
    font-size: 1.6rem;
  }

  i {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.6rem;
    background-color: #ffffff;
    color: #eee;
    padding: 3px;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin-top: 5px;
    font-size: 1.3rem;
  }

  button {
    width: 100%;
    padding:10px;
    border-radius: 8px;
    background: ${({theme}) => theme.color.primary.main};
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 15px;
    
    &:hover {
      background: ${({theme}) => theme.color.primary.darker};
    }
  }
`
