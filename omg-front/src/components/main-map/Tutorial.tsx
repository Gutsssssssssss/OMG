import { useEffect, useState } from 'react';
import {
  TbSquareArrowDown,
  TbSquareArrowLeft,
  TbSquareArrowRightFilled,
  TbSquareArrowUp,
} from 'react-icons/tb';

import { introduction } from '@/assets/data/introduction';

function splitIntoSentences(text: string) {
  // 마침표, 느낌표, 물음표, 쉼표 뒤에 공백이 있는 경우 기준으로 문장 나누기
  return text
    .split(/(?<=[.,!?])\s+/g) // 쉼표, 마침표, 느낌표, 물음표 뒤에 공백이 있으면 분리
    .filter(sentence => sentence.trim().length > 0); // 빈 문자열 제거
}

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계 추적
  const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 여부

  const { header, tips, footer } = introduction;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowContent(false); // 먼저 글자를 사라지게 함
      setTimeout(() => {
        setCurrentStep(prev => (prev + 1) % tips.length); // 다음 단계로 이동
        setShowContent(true); // 글자를 다시 표시
      }, 1000); // 1초 동안 글자를 숨긴 후 변경
    }, 3000); // 5초마다 단계 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, []);

  return (
    <div className='flex items-center justify-center w-full h-full bg-black bg-opacity-80'>
      <div className='flex flex-col items-center justify-start w-full h-full'>
        <main className='w-full flex flex-col items-center justify-end gap-2 h-[40%]'>
          <div className='flex items-center'>
            <img src='/assets/logo.png' alt='logo' className='mr-4 w-36 h-36' />
            <p className='text-omg-100b text-[#E5BB47]'> M G</p>
          </div>
          <h2 className='font-omg-event-content text-omg-30b text-[#E5BB47]'>
            {header}
          </h2>
        </main>

        <body className='w-full h-[50%] flex items-center'>
          <div className='max-w-[70%] mx-auto text-center'>
            <p
              className={`text-white text-omg-28 transition-opacity duration-1000 leading-relaxed ${showContent ? 'opacity-100' : 'opacity-0'}`}
            >
              {splitIntoSentences(tips[currentStep].content).map(
                (sentence: string, index: number) => (
                  <span key={index}>
                    {sentence}
                    <br />
                  </span>
                ),
              )}
            </p>

            {currentStep === 0 && (
              <div className='flex justify-center'>
                <TbSquareArrowDown className='mt-2 text-white text-omg-32' />
              </div>
            )}
            {currentStep === 1 && (
              <div className='flex items-center justify-center mt-2 space-x-2'>
                <TbSquareArrowLeft className='text-white text-omg-32' />
                <TbSquareArrowUp className='text-white text-omg-32' />
                <TbSquareArrowRightFilled className='text-white text-omg-32' />
              </div>
            )}
          </div>
        </body>

        <footer className='h-[10%] w-full flex justify-center items-center'>
          <p className='text-white text-omg-28 font-omg-event-content'>
            {footer}
          </p>
        </footer>
      </div>
    </div>
  );
}