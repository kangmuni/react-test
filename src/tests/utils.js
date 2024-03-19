import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { YoutubeApiContext } from '../context/YoutubeApiContext';

export function withRouter(routes, initialEntry = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAllContexts(children, youtube) {
  const testClient = createTestQueryClient();
  // 외부에서 가짜 mock 상태의 youtube를 전달할거임
  // YoutubeApiContext 파일 따로 분리 해주었기 때문에 우리만의 테스트용 provider를 사용할수 있음
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
