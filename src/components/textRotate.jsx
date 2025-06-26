import React from 'react';

const RotatingHeadline = () => {
  const words = ["Beyond the Browser", "Ripground"];

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={`${text}-${index}`}
        className="letter"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Use a non-breaking space for actual spaces to maintain layout */}
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <h1 id="landing-heading" className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
        <div className="word-rotator">
          {/* First phrase */}
          <div className="text-1">
            {splitText(words[0])}
          </div>
          {/* Second phrase (absolutely positioned) */}
          <div className="text-2">
            {splitText(words[1])}
          </div>
        </div>
      </h1>

      <style>{`
        .word-rotator {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1.2em; /* Adjust to fit font size */
          perspective: 400px;
          transform-style: preserve-3d;
        }

        .word-rotator > div {
          white-space: nowrap; /* Prevent phrases from wrapping */
        }

        .letter {
          display: inline-block;
          transform-origin: bottom;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* --- Animation for the first phrase --- */
        .text-1 .letter {
          animation: textRotate1 2.4s infinite alternate;
        }

        /* --- Animation for the second phrase --- */
        .text-2 {
          position: absolute;
          color: #3182ce; /* Accent color for the second phrase */
        }
        
        .text-2 .letter {
          transform: translate3d(0, 100%, 0) rotateX(-90deg);
          animation: textRotate2 2.4s infinite alternate;
        }

        /* Keyframes from your example.
          textRotate1 animates the first word out (upwards).
        */
        @keyframes textRotate1 {
          0% {
            transform: translate3d(0, 0%, 0) rotateX(0deg);
          }
          40% {
            transform: translate3d(0, 0%, 0) rotateX(0deg);
          }
          60% {
            transform: translate3d(0, -100%, 0) rotateX(-90deg);
          }
          100% {
            transform: translate3d(0, -100%, 0) rotateX(-90deg);
          }
        }

        /* textRotate2 animates the second word in (from below).
        */
        @keyframes textRotate2 {
          0% {
            transform: translate3d(0, 100%, 0) rotateX(-90deg);
          }
          40% {
            transform: translate3d(0, 100%, 0) rotateX(-90deg);
          }
          60% {
            transform: translate3d(0, 0%, 0) rotateX(0deg);
          }
          100% {
            transform: translate3d(0, 0%, 0) rotateX(0deg);
          }
        }
      `}</style>
    </>
  );
};

export default RotatingHeadline;