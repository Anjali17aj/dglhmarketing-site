import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  // Start visible so the first paint (and LCP) is not delayed by opacity: 0.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className={`page-transition${visible ? ' page-transition--visible' : ''}`}>
      {children}
    </div>
  );
}
