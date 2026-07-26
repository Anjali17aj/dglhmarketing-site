import { useEffect, useRef } from 'react';

export default function StaggerObserver({ children, className = '' }) {
  const groupRef = useRef(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return undefined;

    const items = group.querySelectorAll('.stagger-item');
    const reveal = () => {
      items.forEach((item) => item.classList.add('reveal--visible'));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      return undefined;
    }

    const rect = group.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8px 0px' },
    );

    observer.observe(group);
    const failsafe = window.setTimeout(reveal, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div ref={groupRef} className={className}>
      {children}
    </div>
  );
}
