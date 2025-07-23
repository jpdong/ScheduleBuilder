"use client"
import React, { useState, useEffect } from 'react';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';
import YesNoWheel from './YesNoWheel';

const ResponsiveHero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  
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
  
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  
  return (
    <Container>
      <Row gutter={[40, 40]} align="middle" style={{ padding: '60px 0 40px 0' }}>
        <Column xs={24} md={12}>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            marginBottom: 20, 
            color: '#2c3e50',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Yes or No Decision Wheel
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: 30, 
            color: '#666',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Can't make a decision? Let our wheel decide for you! Ask a yes/no question and spin the wheel to get your answer.
          </p>
          
          <div style={{ 
            marginBottom: '30px',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <label 
              htmlFor="question" 
              style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Type your question:
            </label>
            <input
              type="text"
              id="question"
              placeholder="Should I..."
              value={question}
              onChange={handleQuestionChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </Column>
        <Column xs={24} md={12} style={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <YesNoWheel size={isMobile ? 280 : 320} />
        </Column>
      </Row>
    </Container>
  );
};

export default ResponsiveHero;