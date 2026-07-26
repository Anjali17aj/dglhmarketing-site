import { Children, cloneElement, isValidElement } from 'react';

export default function StaggerGroup({
  children,
  as: Tag = 'div',
  className = '',
  stagger = 90,
  variant = 'fade-up',
}) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
          className: [
            child.props.className,
            'reveal',
            `reveal--${variant}`,
            'reveal--slow',
            'stagger-item',
          ].filter(Boolean).join(' '),
          style: {
            ...child.props.style,
            '--reveal-delay': `${index * stagger}ms`,
          },
        });
      })}
    </Tag>
  );
}
