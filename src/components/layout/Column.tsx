import React from 'react';

interface ColumnProps {
  xs?: number;
  md?: number;
  lg?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ xs, md, lg, children, style }) => {
  let className = 'col';

  // Simple responsive logic
  if (lg === 6) className += ' col-3';
  else if (md === 12) className += ' col-6';
  else if (xs === 24) className += ' col-12';

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Column;