import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  // 테스트 끝날때마다 mock함수 깨끗하게 정리
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it('renders correctly', async () => {
    // 호출되면 url을 리턴
    fakeYoutube.channelImageURL.mockImplementation(() => 'url');
    // url 받아오는 부분이 비동기이기때문에 그냥 스냅샷을 하면 이름만 나온다. url이 있을때까지 기다려야하므로 먼저 render를 해야한다.
    const { asFragment } = renderChannelInfo();

    await waitFor(() => screen.getByRole('img'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without URL', () => {
    fakeYoutube.channelImageURL.mockImplementation(() => {
      throw new Error('error');
    });
    renderChannelInfo();

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => 'url');

    renderChannelInfo();

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });

  function renderChannelInfo() {
    return render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );
  }
});
