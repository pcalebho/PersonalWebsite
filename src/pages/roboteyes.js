'use client';

import { useEffect, useState } from 'react';

const emotions = {
  happy: { borderRadius: '60% 60% 30% 30%', width: '180px', height: '230px', rotate: { left: '-10deg', right: '10deg' }, spacing: '500px' },
  sad: { borderRadius: '20% 20% 60% 60%', width: '200px', height: '250px', rotate: { left: '0deg', right: '0deg' }, spacing: '520px' },
  surprised: { borderRadius: '50% 50% 50% 50%', width: '220px', height: '270px', rotate: { left: '0deg', right: '0deg' }, spacing: '540px' },
  angry: { borderRadius: '20% 20% 60% 60%', width: '240px', height: '150px', rotate: { left: '15deg', right: '-15deg' }, spacing: '550px' },
};

const eyeMovementScale = 50;

export default function EyesTracker() {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const emotionKeys = Object.keys(emotions);
  const currentEmotion = emotions[emotionKeys[currentEmotionIndex]];

  useEffect(() => {
    const handleMouseMove = (event) => {
      document.querySelectorAll('.eye').forEach((eye, index) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const deltaX = event.clientX - eyeX;
        const deltaY = event.clientY - eyeY;
        const angle = Math.atan2(deltaY, deltaX);
        const rotation = index === 0 ? currentEmotion.rotate.left : currentEmotion.rotate.right;
        eye.style.transform = `translate(${Math.cos(angle) * eyeMovementScale}px, ${Math.sin(angle) * eyeMovementScale}px) rotate(${rotation})`;
      });
    };

    const handleClick = () => {
      setCurrentEmotionIndex((prevIndex) => (prevIndex + 1) % emotionKeys.length);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [currentEmotionIndex]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#222', position: fixed, top: 0, left: 0}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', transition: 'width 0.5s ease', width: currentEmotion.spacing }}>
        <div className="eye" style={{ backgroundColor: 'white', borderRadius: currentEmotion.borderRadius, width: currentEmotion.width, height: currentEmotion.height, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'border-radius 0.5s ease, transform 0.3s ease, width 0.5s ease, height 0.5s ease' }}></div>
        <div className="eye" style={{ backgroundColor: 'white', borderRadius: currentEmotion.borderRadius, width: currentEmotion.width, height: currentEmotion.height, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'border-radius 0.5s ease, transform 0.3s ease, width 0.5s ease, height 0.5s ease' }}></div>
      </div>
    </div>
  );
}
