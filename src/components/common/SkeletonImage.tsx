'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function SkeletonImage({ onLoad, className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(e);
  };

  if (props.fill) {
    return (
      <>
        {!loaded && <div className="absolute inset-0 animate-shimmer" />}
        <NextImage
          {...props}
          className={`${className ?? ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
        />
      </>
    );
  }

  return (
    <div className="relative shrink-0" style={{ width: props.width, height: props.height }}>
      {!loaded && <div className="absolute inset-0 animate-shimmer rounded-md" />}
      <NextImage
        {...props}
        className={`${className ?? ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
