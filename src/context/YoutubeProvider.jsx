import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';
import { YoutubeApiContext } from './YoutubeApiContext';

// export const YoutubeApiContext = createContext();
// => YoutubeApiContext 파일로 따로 분리

const client = new YoutubeClient(); // 여기 인스턴스에서 사용하는 axios때문에 불가피하게 사용됨, 실제 테스트 할때 필요하지 않은 부분들이기에 YoutubeApiContext 파일로 따로 분리 하려해준다.
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

// export function useYoutubeApi() {
//   return useContext(YoutubeApiContext);
// }
// => YoutubeApiContext 파일로 따로 분리
