'use client';

import { getEmbedUrl } from '@/lib/music';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
  className?: string;
}

export function YouTubePlayer({
  videoId,
  title,
  autoplay = true,
  className = '',
}: YouTubePlayerProps) {
  return (
    <div className={`w-full rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full border-0 rounded-lg"
          src={getEmbedUrl(videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
