import React from 'react';

interface RowProps {
  gutter?: [number, number];
  align?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children, style, ...props }) => (
  <div className="row" style={style}>
    {children}
  </div>
);

export default Row;