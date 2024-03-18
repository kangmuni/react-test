import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import { formatAgo } from '../../util/date';
import VideoCard from '../VideoCard';
import { withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';

describe('VideoCard', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  // 정적 테스트
  it('renders video item', () => {
    render(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    // 비디오가 보여졌을때 이런것들이 보여져야한다. (컴포넌트 단위로 테스트 작성)
    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  // 동적 테스트
  it('navigates to detailed video page with video state when clicked', () => {
    // 원하는 경로로 이동했을때, 원하는 객체를 보여주는지 state 전달
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    // 원하는경로로 이동하는지 확인
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    // 비디오 카드에 원하는 state가 있는지 확인
    const card = screen.getByRole('listitem');
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
