import React from 'react';

const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>{children}</div>
);

export default Container; 