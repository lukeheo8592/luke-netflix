import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IMovie } from '../api';
import {
  CATEGORY_MOVIE,
  CATEGORY_TV,
  DEFAULT_IMAGE,
  KEYWORD,
  MOIVES,
} from '../constants';
import { makeImagePath } from '../utils';
import ClickMovie from './ClickMovie';

const Slider = styled.div`
  position: relative;
  height: 180px;
  top: -170px;
  margin-bottom: 70px;
`;

const Row = styled(motion.div)<{ isFirst: number; hover: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.hover === false
      ? 'repeat(6, 1fr) 0.2fr'
      : '0.2fr repeat(6, 1fr) 0.2fr'};
  gap: 5px;
  width: 100%;
  margin-top: 16px;
  padding: ${(props) =>
    props.hover === false ? '0px 0px 0px 65px' : '0px 0px 0px 0px'};
  position: absolute;
`;

const Box = styled(motion.div)<{ hover?: boolean; bgPhoto: string }>`
  background-color: white;
  height: 180px;
  font-size: 66px;
  background-image: ${(props) =>
    props.bgPhoto === `https://image.tmdb.org/t/p/w500/`
      ? `url(${DEFAULT_IMAGE})`
      : `url(${props.bgPhoto})`};
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  &:hover {
    z-index: 2;
  }
  &:first-child {
    transform-origin: ${(props) =>
      props.hover ? 'center left' : 'center left'};
  }
  &:nth-child(2) {
    transform-origin: ${(props) =>
      props.hover ? 'center left' : 'center center'};
  }
  &:nth-child(6) {
    transform-origin: ${(props) =>
      props.hover ? 'center center' : 'center right'};
  }
  &:nth-child(7) {
    transform-origin: ${(props) =>
      props.hover ? 'center right' : 'center center'};
  }
`;

const Archive = styled.span`
  font-size: 32px;
  font-weight: 600;
  padding-left: 65px;
`;

const ArrowBtn = styled(motion.div)`
  color: white;
  z-index: 1;
  width: 65px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -50px;
  i {
    position: relative;
    text-align: center;
  }

  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  h4 {
    font-size: 14px;
    text-align: center;
  }
`;

const ArchiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const IndexBoxs = styled.div`
  display: flex;
  padding-right: 65px;
`;

const IndexBox = styled(motion.div)<{ index: boolean }>`
  width: 10px;
  margin-left: 2px;
  height: 2px;
  background-color: ${(props) =>
    props.index ? props.theme.white.lighter : props.theme.black.lighter};
`;

const rowVariants: Variants = {
  hidden: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

const boxVariants: Variants = {
  normal: { scale: 1, transition: { type: 'tween' } },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: 'tween' },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.1, type: 'tween' },
  },
};

const ArrowVariants: Variants = {
  btnNormal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: '20px',
    color: 'rgba(255,255,255,0)',
  },
  btnHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    fontSize: '30px',
    color: 'rgba(255,255,255,1)',
  },
  exit: {
    opacity: 0,
  },
};

const offset = 6;

interface INowProps {
  videoData: IMovie[];
  sliderTitle?: string;
  search?: string;
  isWhat: string;
  unqKey: string;
}

function NowMovies({
  videoData,
  sliderTitle,
  search,
  isWhat,
  unqKey,
}: INowProps) {
  const history = useHistory();
  const location = useLocation();
  //console.log(pathName);
  const [leaving, setLeaving] = useState(false);
  const [rowHover, setRowHover] = useState(false);
  const rowMouseEnterLeave = () => {
    setRowHover((prev) => !prev);
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const [back, setBack] = useState(false);
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);
  const totalMovies = videoData.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const decreaseIndex = () => {
    if (videoData) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();

      setIndex((prev) => (index === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseIndex = () => {
    if (videoData) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      setHover(true);
      setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
    }
  };
  let keyword = new URLSearchParams(location.search).get(KEYWORD);
  const onBoxClicked = (id: number) => {
    if (!search) {
      if (isWhat === CATEGORY_MOVIE) {
        history.push(`/movies/${id}`);
      } else if (isWhat === CATEGORY_TV) {
        history.push(`/tv/${id}`);
      }
    } else if (search) {
      if (isWhat === CATEGORY_MOVIE) {
        history.push(`/search?keyword=${keyword}&movies=${id}`);
      } else if (isWhat === CATEGORY_TV) {
        history.push(`/search?keyword=${keyword}&tv=${id}`);
      }
    }
  };
  const bigMovieMatch = useRouteMatch<{ movieId?: string }>(
    !search ? `/movies/:movieId` : 'undefined'
  );

  const bigTvMatch = useRouteMatch<{ tvId?: string }>(
    !search ? `/tv/:tvId` : 'undefined'
  );

  const locationTv = {
    params: {
      tvId: new URLSearchParams(location.search).get(CATEGORY_TV),
    },
  };
  const locationMovie = {
    params: {
      movieId: new URLSearchParams(location.search).get(MOIVES),
    },
  };

  return (
    <>
      <Slider
        onMouseLeave={rowMouseEnterLeave}
        onMouseEnter={rowMouseEnterLeave}
      >
        <AnimatePresence
          onExitComplete={toggleLeaving}
          initial={false}
          custom={back}
        >
          <ArchiveContainer>
            <Archive key={sliderTitle + 'cvxbfg'}>{sliderTitle}</Archive>
            <IndexBoxs>
              {rowHover &&
                Array.from({ length: maxIndex + 1 }, (v, i) => i).map(
                  (item) => <IndexBox key={item} index={item === index} />
                )}
            </IndexBoxs>
          </ArchiveContainer>
          {hover && (
            <ArrowBtn
              key="leftBtn"
              onClick={decreaseIndex}
              variants={ArrowVariants}
              initial="btnNormal"
              animate="btnNormal"
              exit="btnNormal"
              transition={{ type: 'tween', duration: 0.2 }}
              whileHover="btnHover"
            >
              <motion.i key="leftI" className="fas fa-chevron-left" />
            </ArrowBtn>
          )}
          <Row
            key={index}
            custom={back}
            isFirst={index}
            hover={hover}
            variants={rowVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
            transition={{ type: 'easy-in-out', duration: 0.5 }}
          >
            {hover === true ? (
              <Box
                key="prevBox"
                variants={boxVariants}
                initial={false}
                transition={{ type: 'tween', duration: 0.1 }}
                bgPhoto={makeImagePath(
                  videoData
                    ? index === 0
                      ? videoData[
                          Math.floor((videoData.length - 1) / 6) * offset
                        ]?.backdrop_path
                      : videoData[offset * index]?.backdrop_path
                    : '',
                  'w500'
                )}
              />
            ) : null}
            {videoData
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((item) => (
                <Box
                  layoutId={item.id + unqKey}
                  onClick={() => onBoxClicked(item.id)}
                  hover={hover}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: 'tween', duration: 0.1 }}
                  bgPhoto={makeImagePath(
                    item.backdrop_path
                      ? item.backdrop_path
                      : item.poster_path
                      ? item.poster_path
                      : '',
                    'w500'
                  )}
                  key={item.id + unqKey}
                >
                  <Info key="movieInfo" variants={infoVariants}>
                    <h4 key="movieTitle">
                      {isWhat === CATEGORY_MOVIE ? item.title : item.name}
                    </h4>
                  </Info>
                </Box>
              ))}
            {index !== maxIndex ? (
              <Box
                key="nextBox"
                variants={boxVariants}
                initial="normal"
                layoutId={videoData[offset * index + offset + 1]?.id + unqKey}
                transition={{ type: 'tween', duration: 0.1 }}
                bgPhoto={makeImagePath(
                  videoData
                    ? videoData[offset * index + offset + 1]?.backdrop_path
                    : '',
                  'w500'
                )}
              />
            ) : (
              <Box
                key="nextBox"
                variants={boxVariants}
                initial="normal"
                layoutId={videoData[1].id + unqKey}
                transition={{ type: 'tween', duration: 0.1 }}
                bgPhoto={makeImagePath(
                  videoData ? videoData[1]?.backdrop_path : '',
                  'w500'
                )}
              />
            )}
          </Row>
          (
          <ArrowBtn
            key="rightBtn"
            variants={ArrowVariants}
            initial="btnNormal"
            animate="btnNormal"
            exit="btnNormal"
            transition={{ type: 'tween', duration: 0.2 }}
            whileHover="btnHover"
            onClick={increaseIndex}
          >
            <motion.i key="rightI" className="fas fa-chevron-right" />
          </ArrowBtn>
          )
        </AnimatePresence>
      </Slider>
      {(locationMovie.params.movieId
        ? locationMovie.params.movieId?.length >= 1
        : false || bigMovieMatch) &&
        isWhat === CATEGORY_MOVIE && (
          <ClickMovie
            key="xvcmds"
            bigVideoMatch={bigMovieMatch ? bigMovieMatch : locationMovie}
            videoData={videoData}
            search={search}
            isWhat={CATEGORY_MOVIE}
            keyword={keyword ? keyword : undefined}
            unqKey={unqKey}
          />
        )}
      {(locationTv.params.tvId
        ? locationTv.params.tvId?.length >= 1
        : false || bigTvMatch) &&
        isWhat === CATEGORY_TV && (
          <ClickMovie
            key="xvcmdsss"
            bigVideoMatch={bigTvMatch ? bigTvMatch : locationTv}
            videoData={videoData}
            search={search}
            isWhat={CATEGORY_TV}
            keyword={keyword ? keyword : undefined}
            unqKey={unqKey}
          />
        )}
    </>
  );
}

export default React.memo(NowMovies);
