import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import cs from 'classnames';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { colors } from '@material-ui/core';
import TagList from '../../components/TagList';
import CompanyLogo from '../../components/CompanyLogo';
import { useSelector } from 'react-redux';

const CarouselWrapper = styled.div`
  height: 400px;
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
    background-color: antiquewhite;
  }
  :nth-child(even) {
    background-color: aliceblue;
  }
  &.showing {
    z-index: 1;
    opacity: 1;
    transform: scale(1);
  }

  .item_logo_title {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    /* justify-items: center; */
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .item__contents {
    display: flex;
    flex-direction: column;
    width: 500px;
    flex-wrap: wrap;
  }

  .item__link {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    color: black;
    text-decoration: none;
    padding: 0.5rem 0;
  }

  .item__logo {
    height: 25px;
    align-self: flex-start;
  }

  @media all and (max-width: ${({ theme }) => theme.sm}) {
    .item__contents {
      width: 250px;
      flex-wrap: wrap;
    }
    .item__link {
      font-size: 1.3rem;
    }
  }
`;

const DotWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 20%;
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
        const { company, title, url, tags } = post;
        return (
          <CarouselItem
            key={idx}
            className={cs({ showing: itemNumber === idx })}
          >
            <div className="item__contents">
              <CompanyLogo name={company.name} />
              <a className="item__link" href={url}>
                {title}
              </a>
              <TagList tags={tags} />
            </div>
          </CarouselItem>
        );
      })}
    </CarouselWrapper>
  );
}

export default Carousel;
