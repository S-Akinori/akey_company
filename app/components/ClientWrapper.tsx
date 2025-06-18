'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import KeyAndLogoScene from './KeyAndLogoScene';

// MainContent をサーバーコンポーネントとして遅延読み込み
const MainContent = dynamic(() => import('./MainContent'), {
  ssr: true,
});

export default function ClientWrapper() {
  const [isFinished, setIsFinished] = useState(false);
  const explodedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.querySelector('header')?.style.setProperty('display', 'none');
  }, []);

  const handleAnimationFinish = () => {
    if (!explodedRef.current) {
      explodedRef.current = true;
      setIsFinished(true);
      document.body.style.overflow = 'auto';
      document.querySelector('header')?.style.setProperty('display', 'block');
      // console.log('Animation finished, MainContent will be displayed now.');
    }
  };

  return (
    <div>
        <div className='fixed bg-black -z-10'>
            <KeyAndLogoScene onFinished={handleAnimationFinish} />
        </div>
        {isFinished && <MainContent />}
    </div>
  );
}
