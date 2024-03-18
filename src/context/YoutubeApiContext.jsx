import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

const client = new YoutubeClient();
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  // 단위 테스트이기때문에 유튜브 구현사항까지 의존하고싶지않다.
  // 컴포넌트 자체만 테스트 할 수 있게 만들어야함 (나머지 의존사항은 mocking하는게 좋음)
  // <YoutubeApiContext.Provider value={{ youtube }}> 이 부분을 따로 만들어줄거임 => tests > utils.js
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
