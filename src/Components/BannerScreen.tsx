import { motion } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getVideoDetail, IGetVideoDetail, IGetVideosProps } from '../api';
import {
  CATEGORY_MOVIE,
  CATEGORY_TV,
  DETAIL,
  VIDEO,
} from '../constants';
import { makeImagePath } from '../utils';

const Banner = styled(motion.iframe)<{
  bgPhoto: string;
  userWidth: number;
  over?: boolean;
}>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  aspect-ratio: 16/9;
  background-position: center center;
  z-index: 1;
`;

const Wrapper = styled.div`
  flex-direction: column;
  top: 40vh;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  padding: 60px 0px 0px 60px;
  z-index: 0;
`;

const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 34px;
  width: 80%;
`;

interface IBanner {
  videoData: IGetVideosProps;
  isWhat: string;
}

function BannerScreen({ videoData, isWhat }: IBanner) {
  const [over, setOver] = useState(false);

  const detailData = useQuery<IGetVideoDetail>([VIDEO, DETAIL], () =>
    getVideoDetail(CATEGORY_MOVIE, videoData.results[0].id + '')
  );
  //console.log(detailData.data?.videos.results);
  const teasearVideo = detailData.data?.videos.results.find(
    (item) => item.type === 'Teaser'
  );
  const trailerVideo = detailData.data?.videos.results.find(
    (item) => item.type === 'Trailer'
  );
  const openingVideo = detailData.data?.videos.results.find(
    (item) => item.type === 'Opening Credits'
  );

  const detailVideo = teasearVideo
    ? teasearVideo
    : trailerVideo
    ? trailerVideo
    : openingVideo;
  const mouseEnter = () => {
    setOver(true);
  };
  const mouseLeave = () => {
    setOver(false);
  };
  return (
    <>
      {detailVideo ? (
        <Banner
          key={detailVideo.key + 'a1q'}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          over={over}
          src={
            over
              ? `https://www.youtube.com/embed/${detailVideo.key}?mute=0&autoplay=1&controls=0&loop=1&start=0&playlist=${detailVideo?.key}&cc_lang_pref=ko&cc_load_policy=1&modestbranding=1`
              : ''
          }
          allow="autoplay"
          frameBorder={0}
          userWidth={window.innerWidth}
          bgPhoto={makeImagePath(
            videoData.results[0].backdrop_path
              ? videoData.results[0].backdrop_path
              : videoData.results[0].poster_path
              ? videoData.results[0].poster_path
              : ''
          )}
        />
      ) : (
        <Banner
          key={videoData.results[0].backdrop_path + '12a'}
          userWidth={window.innerWidth}
          bgPhoto={makeImagePath(
            videoData.results[0].backdrop_path
              ? videoData.results[0].backdrop_path
              : videoData.results[0].poster_path
              ? videoData.results[0].poster_path
              : ''
          )}
        />
      )}
      {!over && (
        <Wrapper>
          <Title>
            {isWhat === CATEGORY_MOVIE && videoData.results[0].title}
            {isWhat === CATEGORY_TV && videoData.results[0].name}
          </Title>
          <Overview>{videoData.results[0].overview}</Overview>
        </Wrapper>
      )}
    </>
  );
}

export default BannerScreen;
