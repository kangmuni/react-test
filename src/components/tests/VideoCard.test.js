import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { formatAgo } from '../../util/date';
import VideoCard from '../VideoCard';

describe('VideoCard', () => {
  const video = {
    id: 1,
    snippet: {
      title: 'title',
      channelId: '1',
      channelTitle: 'channelTitle',
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: 'http://image/',
        },
      },
    },
  };
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it('renders video item', () => {
    render(
      // 라우터 사용시에는 MemoryRouter 꼭 사용해주기
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );

    // 비디오가 보여졌을때 이런것들이 보여져야한다. (컴포넌트 단위로 테스트 작성)
    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });
});
