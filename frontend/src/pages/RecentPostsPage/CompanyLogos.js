import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  height: 25px;
`;

const LogoButton = styled.button`
  background-color: ${(props) => props.color};
  border: solid black 1px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

function CompanyLogos() {
  const companys = [
    ['brother_logo.png', 'white'],
    ['coupang_logo.png', 'black'],
    ['d2_logo.gif', 'white'],
    ['kakao_logo.jpg', 'black'],
    ['line_logo.png', 'black'],
    ['sds_logo.png'],
    ['spoqa_logo.png'],
    ['tmon_logo.png'],
    ['toast_logo.png'],
    ['yanolja_logo.png', 'black'],
  ];
  return (
    <div>
      {companys.map((company, index) => {
        const [fileName, color] = company;
        const imageUrl = process.env.PUBLIC_URL + '/images/' + fileName;
        return (
          <LogoButton key={index} color={color}>
            <LogoImg src={imageUrl} alt="logo" />
          </LogoButton>
        );
      })}
    </div>
  );
}

export default CompanyLogos;
