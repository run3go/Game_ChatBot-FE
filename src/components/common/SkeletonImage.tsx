'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SkeletonImageProps extends ImageProps {
  wrapperClassName?: string;
}

export default function SkeletonImage({ onLoad, className, wrapperClassName, ...props }: SkeletonImageProps) {
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

  const wrapperStyle = wrapperClassName
    ? undefined
    : { width: props.width, height: props.height };

  return (
    <div
      className={`relative shrink-0 ${wrapperClassName ?? ''}`}
      style={wrapperStyle}
    >
      {!loaded && <div className="absolute inset-0 animate-shimmer rounded-md" />}
      <NextImage
        {...props}
        className={`${className ?? ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
