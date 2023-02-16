import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  getMoviesPage1,
  getMoviesPage2,
  getMoviesPage3,
  getMoviesPage4,
  getMoviesPage5,
  getMoviesPage6,
  getUpcommingData,
  IGetVideosProps,
  IMovie,
  topRateMoviePage1,
  topRateMoviePage2,
  topRateMoviePage3,
  topRateMoviePage4,
  topRateMoviePage5,
  topRateMoviePage6,
} from '../api';
import BannerScreen from '../Components/BannerScreen';
import Footer from '../Components/Footer';
import NowMovies from '../Components/NowMovies';
import {
  CATEGORY_MOVIE,
  MOIVES,
  NOW_PLAYING_PAGE,
  TOP_RATE_PAGE,
  UPCOMMING,
} from '../constants';

const Wrapper = styled.div``;

const Loader = styled.div``;

function Home() {
  const nowMovieData: IMovie[] = [];
  const recommendData: IMovie[] = [];
  const topRateMovies: IMovie[] = [];
  const recommendData2: IMovie[] = [];
  const upcommingData: IMovie[] = [];
  const nowPage1 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}1`],
    getMoviesPage1
  );
  const nowPage2 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}2`],
    getMoviesPage2
  );
  const nowPage3 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}3`],
    getMoviesPage3
  );
  const nowPage4 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}4`],
    getMoviesPage4
  );
  const nowPage5 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}5`],
    getMoviesPage5
  );
  const nowPage6 = useQuery<IGetVideosProps>(
    [MOIVES, `${NOW_PLAYING_PAGE}6`],
    getMoviesPage6
  );

  const topRatePage1 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}1`],
    topRateMoviePage1
  );

  const topRatePage2 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}2`],
    topRateMoviePage2
  );

  const topRatePage3 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}3`],
    topRateMoviePage3
  );

  const topRatePage4 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}4`],
    topRateMoviePage4
  );

  const topRatePage5 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}5`],
    topRateMoviePage5
  );

  const topRatePage6 = useQuery<IGetVideosProps>(
    [MOIVES, `${TOP_RATE_PAGE}6`],
    topRateMoviePage6
  );

  const upcommingPage1 = useQuery<IGetVideosProps>(
    [MOIVES, `${UPCOMMING}1`],
    () => getUpcommingData(1)
  );
  const upcommingPage2 = useQuery<IGetVideosProps>(
    [MOIVES, `${UPCOMMING}2`],
    () => getUpcommingData(2)
  );
  const upcommingPage3 = useQuery<IGetVideosProps>(
    [MOIVES, `${UPCOMMING}3`],
    () => getUpcommingData(3)
  );

  //console.log(nowPage1);
  nowPage1?.data?.results.map((item) => nowMovieData.push(item));
  nowPage2?.data?.results.map((item) => nowMovieData.push(item));
  nowPage3?.data?.results.map((item) => nowMovieData.push(item));

  nowPage4?.data?.results.map((item) => recommendData.push(item));
  nowPage5?.data?.results.map((item) => recommendData.push(item));
  nowPage6?.data?.results.map((item) => recommendData.push(item));

  topRatePage1?.data?.results.map((item) => topRateMovies.push(item));
  topRatePage2?.data?.results.map((item) => topRateMovies.push(item));
  topRatePage3?.data?.results.map((item) => topRateMovies.push(item));

  topRatePage4?.data?.results.map((item) => recommendData2.push(item));
  topRatePage5?.data?.results.map((item) => recommendData2.push(item));
  topRatePage6?.data?.results.map((item) => recommendData2.push(item));

  upcommingPage1.data?.results.map((item) => upcommingData.push(item));
  upcommingPage2.data?.results.map((item) => upcommingData.push(item));
  upcommingPage3.data?.results.map((item) => upcommingData.push(item));
  // console.log(clickedMovie);
  //console.log(index, "인뎃으");
  //console.log(nowMovieData, isLoading);

  const location = useLocation();

  return (
    <Wrapper>
      {upcommingData.length < 58 ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {nowPage1.data?.results[0] && (
            <BannerScreen videoData={nowPage1.data} isWhat={CATEGORY_MOVIE} />
          )}

          {nowMovieData && (
            <NowMovies
              unqKey="qw1"
              isWhat={CATEGORY_MOVIE}
              videoData={nowMovieData}
              search={location.search ? location.search : ''}
              sliderTitle="지금 뜨는 콘텐츠"
            />
          )}
          {topRateMovies && (
            <NowMovies
              unqKey="qw2"
              isWhat={CATEGORY_MOVIE}
              videoData={topRateMovies}
              search={location.search ? location.search : ''}
              sliderTitle="취향 저격 베스트 콘텐츠"
            />
          )}
          {recommendData && (
            <NowMovies
              unqKey="qw3"
              isWhat={CATEGORY_MOVIE}
              videoData={recommendData}
              search={location.search ? location.search : ''}
              sliderTitle="인기 있는 영화순위"
            />
          )}
          {recommendData2 && (
            <NowMovies
              unqKey="qw4"
              isWhat={CATEGORY_MOVIE}
              videoData={recommendData2}
              search={location.search ? location.search : ''}
              sliderTitle="워워드 수상 해외영화"
            />
          )}
          {upcommingData && (
            <NowMovies
              unqKey="qw5"
              isWhat={CATEGORY_MOVIE}
              videoData={upcommingData}
              search={location.search ? location.search : ''}
              sliderTitle="곧 개봉할 영화"
            />
          )}
          <Footer />
        </>
      )}
    </Wrapper>
  );
}

export default Home;