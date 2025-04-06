import React from 'react';
import { youtubeVideos } from './movie/youtubeVideos';

function Learning() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">
        学習コンテンツ
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {youtubeVideos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.videoUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="rounded-t-xl w-full"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{video.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Learning;
