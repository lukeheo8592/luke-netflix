import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import { getSearchVideo, ISearchMovie } from '../api';
import styled from 'styled-components';
import NowMovies from '../Components/NowMovies';
import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import {
  CATEGORY_MOVIE,
  CATEGORY_TV,
  KEYWORD,
  MOIVES,
  SEARCH,
} from '../constants';

const Wrapper = styled.div`
  padding-top: 500px;
`;

const Loader = styled.div`
  font-size: 48px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const [isRefetch, setIsRefetch] = useState(false);
  const location = useLocation();
  const keyword: any = location.search
    ? new URLSearchParams(location.search).get(KEYWORD)
    : '';
  const word: string = keyword
    ?.toString()
    .trim()
    ?.replace(/,/g, ' ')
    .split(' ')
    .map((item: string) => item.trim().split(' '))
    .join('+');

  useEffect(() => {
    setIsRefetch(true);
    setTimeout(() => {
      setIsRefetch(false);
    }, 400);
  }, [keyword]);

  const searchData = useQuery<ISearchMovie>(
    [MOIVES, `${SEARCH}1`],
    () => getSearchVideo(CATEGORY_TV, word),
    { refetchInterval: isRefetch ? 100 : 0 }
  );

  const searchData2 = useQuery<ISearchMovie>(
    [MOIVES, `${SEARCH}2`],
    () => getSearchVideo(CATEGORY_MOVIE, word),
    { refetchInterval: isRefetch ? 100 : 0 }
  );

  //console.log(location);
  //console.log(pramas);
  //console.log(location);
  // console.log(keyword);

  //console.log(location);
  //console.log(location);
  //console.log(searchData);
  return (
    <Wrapper key={location.key?.slice(2, 4)}>
      {!searchData.data?.results[0] && !searchData2.data?.results[0] ? (
        <Loader>검색한 결과가 없습니다</Loader>
      ) : (
        <>
          {searchData.data?.results[0] && (
            <NowMovies
              unqKey="se1"
              isWhat={CATEGORY_TV}
              key={new URLSearchParams(location.search).get(KEYWORD)}
              search={location.search ? location.search : ''}
              videoData={searchData.data?.results}
              sliderTitle={`TV 카테코리 : ${keyword}`}
            />
          )}
          {searchData2.data?.results[0] && (
            <NowMovies
              unqKey="se2"
              key={word + '456'}
              search={location.search ? location.search : ''}
              videoData={searchData2.data?.results}
              isWhat={CATEGORY_MOVIE}
              sliderTitle={`Movie 카테고리 : ${keyword}`}
            />
          )}
          <Footer />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
