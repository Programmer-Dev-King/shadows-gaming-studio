import { useEffect } from 'react';

const useKonamiCode = (callback) => {
  useEffect(() => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let index = 0;

    const onKeyDown = (event) => {
      if (event.keyCode === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [callback]);
};

export default useKonamiCode;