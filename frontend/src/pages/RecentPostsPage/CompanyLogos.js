import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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

const CompanyLogos = () => {
  const companys = [
    ['brother_logo.png', 'white'],
    ['coupang_logo.png', 'black'],
    ['d2_logo.gif', 'white'],
    ['kakao_logo.jpg', 'black'],
    ['line_logo.png', 'black'],
    ['sds_logo.png', 'white'],
    ['spoqa_logo.png', 'white'],
    ['tmon_logo.png', 'black'],
    ['toast_logo.png', 'white'],
    ['yanolja_logo.png', 'black'],
  ];
  return (
    <div>
      {companys.map((company, index) => (
        <LogoButton key={index} color={company[1]}>
          <LogoImg
            width={'auto'}
            height={'20px'}
            src={process.env.PUBLIC_URL + '/images/' + company[0]}
            alt=""
          />
        </LogoButton>
      ))}
    </div>
  );
};

export default CompanyLogos;
