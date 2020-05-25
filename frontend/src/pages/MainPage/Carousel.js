import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import cs from 'classnames';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import logos from '../../lib/logos';
import { colors } from '@material-ui/core';

const CarouselWrapper = styled.div`
  height: 50vh;
  position: relative;
`;

const CarouselBtn = styled.button`
  background-color: transparent;
  position: absolute;
  border: none;
  :focus {
    outline: none;
  }
  padding: 0 1rem;
  z-index: 2;
  top: 50%;
  ${(props) =>
    props.direction === 'left' ? css({ left: 1 }) : css({ right: 1 })}
`;

const CarouselItem = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  transform: scale(0.98);
  /* transform: */
  :nth-child(odd) {
    background-color: aliceblue;
  }
  :nth-child(even) {
    background-color: antiquewhite;
  }
  &.showing {
    z-index: 1;
    opacity: 1;
    transform: scale(1);
  }

  .item__contents {
    padding: 0 1rem;
  }

  .item__link {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    color: black;
    text-decoration: none;
    padding: 0.5rem 0;
  }
  /* 
  .item__date {
    color: grey;
    font-size: 0.8rem;
  } */

  .item__logo {
    height: 25px;
  }
`;

const TagWrapper = styled.div`
  display: flex;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.mainColor};
  padding: 0.1rem 0.3rem;
  color: white;
  border-radius: 5px;
  & + & {
    margin-left: 0.3rem;
  }
`;

const DotWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${colors.grey[300]};
  display: inline-block;
  transition: width 0.5s;

  cursor: pointer;
  &.showing {
    color: red;
    width: 30px;
    border-radius: 30px;
  }

  & + & {
    margin-left: 0.3rem;
  }
`;

function Carousel({ posts }) {
  const [itemNumber, setitemNumber] = useState(0);
  const [globalInterval, setGlobalInterval] = useState(null);

  // 그냥 흐름
  const autoFlow = () => {
    setitemNumber((itemNumber) => {
      return itemNumber === posts.length - 1 ? 0 : itemNumber + 1;
    });
  };

  // 좌/우 버튼 클릭시 세팅
  const handleItemNumber = (direction = 'right') => {
    clearInterval(globalInterval);
    setitemNumber((itemNumber) => {
      if (direction === 'right') {
        if (itemNumber === posts.length - 1) {
          return 0;
        } else {
          return itemNumber + 1;
        }
      } else {
        if (itemNumber === 0) {
          return posts.length - 1;
        } else {
          return itemNumber - 1;
        }
      }
    });
    const interval = setInterval(() => {
      autoFlow();
    }, 4000);
    setGlobalInterval(interval);
  };

  // 점 클릭시 세팅
  const onDotClick = (number) => {
    clearInterval(globalInterval);
    setitemNumber(number);
    const interval = setInterval(() => {
      autoFlow();
    }, 4000);
    setGlobalInterval(interval);
  };

  // 돌아가는 인터벌 설정
  useEffect(() => {
    const interval = setInterval(() => {
      autoFlow();
    }, 4000);
    setGlobalInterval(interval);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);
  return (
    <CarouselWrapper>
      <CarouselBtn
        className="carousel__button"
        direction="left"
        onClick={() => handleItemNumber('left')}
      >
        <ArrowBackIosIcon />
      </CarouselBtn>
      <CarouselBtn
        className="carousel__button"
        direction="right"
        onClick={() => handleItemNumber('right')}
      >
        <ArrowForwardIosIcon />
      </CarouselBtn>

      <DotWrapper>
        {posts.map((_, idx) => (
          <Dot
            key={idx}
            onClick={() => onDotClick(idx)}
            className={cs({ showing: itemNumber === idx })}
          ></Dot>
        ))}
      </DotWrapper>

      {posts.map((post, idx) => {
        const { company, title, url } = post; // TODO {tags, date} 처리좀
        const logoUrl = `${process.env.PUBLIC_URL}/images/${
          logos[company.name]
        }`;
        return (
          <CarouselItem
            key={idx}
            className={cs({ showing: itemNumber === idx })}
          >
            <div className="item__contents">
              <img src={logoUrl} className="item__logo" alt="logo" />
              <a className="item__link" href={url}>
                {title}
              </a>
              {/* TODO: date 넣을까? */}
              {/* <div className="item__date">{date}</div> */}
              {/* TODO: 태그 받으면 어떻게 보여줄꺼야 ? */}
              <TagWrapper>
                {['리액트', '문화', '프로세스'].map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </TagWrapper>
            </div>
          </CarouselItem>
        );
      })}
    </CarouselWrapper>
  );
}

export default Carousel;
