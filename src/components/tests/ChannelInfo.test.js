import { render } from '@testing-library/react';

describe('ChannelInfo', () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  // 테스트 끝날때마다 mock함수 깨끗하게 정리
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it('renders correctly', async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => 'url');

    render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );

    // 쿼리는 무조건 비동기니까 await
    await waitFor(() => screen.getByText('channel'));
  });
});
