import styled from 'styled-components'

export const Loader = styled.div`
  display: ${({ loading }) => (loading ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background: white;
`
