import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Top = styled.div`
  z-index: 5;
  position: fixed;
  height: 40px;
  font-size: 30px;
  width: 40px;
  background: #202020;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 100px;
  right: 50px;
  cursor: pointer;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const TopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      const ht = window.innerHeight * 0.5;

      if (y > ht) setShow(true);

      if (y < ht) setShow(false);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Top show={show} onClick={scrollToTop}>
      &uarr;
    </Top>
  );
};

export default TopButton;
