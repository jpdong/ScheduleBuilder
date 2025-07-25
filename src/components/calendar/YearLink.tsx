"use client"
import React, { useState } from 'react';

interface YearLinkProps {
  year: number;
  href: string;
  children: React.ReactNode;
}

const YearLink: React.FC<YearLinkProps> = ({ year, href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        background: isHovered ? '#4CAF50' : 'white',
        color: isHovered ? 'white' : '#4CAF50',
        textDecoration: 'none',
        borderRadius: '6px',
        border: '2px solid #4CAF50',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

export default YearLink;