"use client";

import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#3b82f6', // blue-500
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const disabledStyle: React.CSSProperties = {
    backgroundColor: '#9ca3af', // gray-400
    cursor: 'not-allowed',
  };

  const style = disabled ? { ...baseStyle, ...disabledStyle } : baseStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;