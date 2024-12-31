export const cardTemplate = `import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
}

export const Card = ({ 
  variant = 'default',
  className,
  ...props 
}: CardProps) => {
  const variantClasses = {
    default: 'bg-white shadow-md',
    bordered: 'border border-gray-200'
  };

  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};`;