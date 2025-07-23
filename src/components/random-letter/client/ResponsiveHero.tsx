"use client"
import React, { useState, useEffect } from 'react';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';
import RandomLetterGenerator from '../RandomLetterGenerator';

const ResponsiveHero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return (
    <Container>
      <Row gutter={[40, 40]} align="middle" style={{ padding: '80px 0 40px 0' }}>
        <Column xs={24} md={12}>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            marginBottom: 20, 
            color: '#2c3e50',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Random Letter Generator
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: 30, 
            color: '#666',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Generate random letters with customizable options for games, teaching, creative projects, and more. Simple, fast, and free to use!
          </p>
        </Column>
        <Column xs={24} md={12}>
          <RandomLetterGenerator />
        </Column>
      </Row>
    </Container>
  );
};

export default ResponsiveHero;