import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    ['channel', id],
    () => youtube.channelImageURL(id),
    // 유닛테스트 할때 네트워크 통신을 하면 안좋다. => 우만의 mock 구현사항으로 대체해야한다.
    // 외부의존성을 우리만의 데이터로 대체한다.
    { staleTime: 1000 * 60 * 5 }
  );
  return (
    <div className="flex my-4 mb-8 items-center">
      {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
}
