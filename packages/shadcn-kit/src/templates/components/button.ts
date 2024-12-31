export const buttonTemplate = `import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'default',
  size = 'md',
  className,
  ...props 
}: ButtonProps) => {
  const variantClasses = {
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-gray-300 hover:border-gray-400'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};`;