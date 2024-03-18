import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { YoutubeApiProvider } from '../context/YoutubeApiContext';

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
  return (
    <YoutubeApiProvider value={youtube}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiProvider>
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
