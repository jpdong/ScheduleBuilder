import React from 'react';

const SectionTitle: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <h2 className="section-title" style={style}>{children}</h2>
);

export default SectionTitle;