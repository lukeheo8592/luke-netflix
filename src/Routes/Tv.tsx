import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  getAiringTodayTvData,
  getPopularTvData,
  getTopRatedTvData,
  getTvOnAir,
  IGetVideosProps,
  IMovie,
} from '../api';
import BannerScreen from '../Components/BannerScreen';
import Footer from '../Components/Footer';
import NowMovies from '../Components/NowMovies';
import {
  AIRING,
  CATEGORY_TV,
  ON_AIR,
  POPULAR,
  TOP_RATE_PROGRAM,
  TV_PROGRAMS,
} from '../constants';

const Wrapper = styled.div``;

const Loader = styled.div``;

function Tv() {
  const topRatedData: IMovie[] = [];
  const onAirData: IMovie[] = [];
  const popularData: IMovie[] = [];
  const aringTodayData: IMovie[] = [];
  const location = useLocation();
  const onAirPage1 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${ON_AIR}1`],
    () => getTvOnAir(1)
  );
  const onAirPage2 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${ON_AIR}2`],
    () => getTvOnAir(2)
  );
  const onAirPage3 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${ON_AIR}3`],
    () => getTvOnAir(3)
  );
  const topRatedPage1 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${TOP_RATE_PROGRAM}1`],
    () => getTopRatedTvData(1)
  );
  const topRatedPage2 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${TOP_RATE_PROGRAM}2`],
    () => getTopRatedTvData(2)
  );
  const topRatedPage3 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${TOP_RATE_PROGRAM}3`],
    () => getTopRatedTvData(3)
  );
  const popularPage1 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${POPULAR}1`],
    () => getPopularTvData(1)
  );
  const popularPage2 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${POPULAR}2`],
    () => getPopularTvData(1)
  );
  const popularPage3 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${POPULAR}3`],
    () => getPopularTvData(1)
  );

  const airingTodayPage1 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${AIRING}1`],
    () => getAiringTodayTvData(1)
  );
  const airingTodayPage2 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${AIRING}3`],
    () => getAiringTodayTvData(2)
  );
  const airingTodayPage3 = useQuery<IGetVideosProps>(
    [TV_PROGRAMS, `${AIRING}2`],
    () => getAiringTodayTvData(3)
  );

  onAirPage1?.data?.results.map((item) => onAirData.push(item));
  onAirPage2?.data?.results.map((item) => onAirData.push(item));
  onAirPage3?.data?.results.map((item) => onAirData.push(item));

  topRatedPage1?.data?.results.map((item) => topRatedData.push(item));
  topRatedPage2?.data?.results.map((item) => topRatedData.push(item));
  topRatedPage3.data?.results.map((item) => topRatedData.push(item));

  popularPage1.data?.results.map((item) => popularData.push(item));
  popularPage2.data?.results.map((item) => popularData.push(item));
  popularPage3.data?.results.map((item) => popularData.push(item));

  airingTodayPage1.data?.results.map((item) => aringTodayData.push(item));
  airingTodayPage2.data?.results.map((item) => aringTodayData.push(item));
  airingTodayPage3.data?.results.map((item) => aringTodayData.push(item));

  return (
    <Wrapper>
      {aringTodayData.length < 58 ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {topRatedPage1.data?.results[1] && (
            <BannerScreen videoData={topRatedPage1.data} isWhat={CATEGORY_TV} />
          )}
          {onAirData && (
            <NowMovies
              unqKey="asa1"
              isWhat={CATEGORY_TV}
              videoData={onAirData}
              search={location.search ? location.search : ''}
              sliderTitle="현재 방송중인 TV 쇼"
            />
          )}
          {topRatedData && (
            <NowMovies
              unqKey="asa2"
              isWhat={CATEGORY_TV}
              videoData={topRatedData}
              search={location.search ? location.search : ''}
              sliderTitle="최고의 콘텐츠"
            />
          )}
          {popularData && (
            <NowMovies
              unqKey="asa3"
              isWhat={CATEGORY_TV}
              videoData={popularData}
              search={location.search ? location.search : ''}
              sliderTitle="가장 유명한 콘텐츠"
            />
          )}
          {aringTodayData && (
            <NowMovies
              unqKey="asa4"
              isWhat={CATEGORY_TV}
              videoData={aringTodayData}
              search={location.search ? location.search : ''}
              sliderTitle="오늘 방송하는 콘텐츠"
            />
          )}
          <Footer />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;