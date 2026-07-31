import styled from 'styled-components'
import sizes from 'theme/sizes'
import theme from 'theme'

export const FilterPanelSidebar = styled.aside`
  background: #eee;
  text-align: left;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 65px;

  &::before {
    content: '';
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  @media ${sizes.xl} {
    position: absolute;
    z-index: 11;
    width: 250px;
    transform: translateX(${({ show, theme }) => (show ? 0 : '-300px')});
    transition: 0.3s;
  }

  @media ${sizes.md} {
    transform: translateX(${({ show, theme }) => (show ? 0 : '-280px')});
  }

  @media ${sizes.mob} {
    transform: translateX(${({ show, theme }) => (show ? 0 : '-265px')});
  }
`
export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: #000;
`

export const List = styled.ul`
  list-style-type: none;

  li {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 5px;

    label {
      cursor: pointer;
    }

    input {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`

export const FilterBtnContainer = styled.div`
  background: white;
  position: sticky;
  top: ${theme.navHt};
  z-index: 5;
  padding: 0.5rem 0;
  display: none;

  @media ${sizes.xl} {
    display: block;
  }
`

export const FilterBtn = styled.div`
  display: none;
  text-align: left;
  margin: 1rem 0;
  cursor: pointer;
  font-size: 1.6rem;
  width: max-content;

  @media ${sizes.xl} {
    display: flex;
  }
`
