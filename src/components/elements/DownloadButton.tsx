import React from 'react';

export interface DownloadButtonProps {
  icon?: React.ReactNode;
  text: string;
  href: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ icon, text, href }) => (
  <a href={href} className="btn btn-large" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
    {icon}
    {text}
  </a>
);

export default DownloadButton;