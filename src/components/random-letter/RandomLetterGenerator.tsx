"use client"
import React, { useState, useEffect } from 'react';

interface RandomLetterOptions {
  quantity: number;
  case: 'upper' | 'lower' | 'mixed';
  excludedLetters: string;
}

const RandomLetterGenerator: React.FC = () => {
  const [options, setOptions] = useState<RandomLetterOptions>({
    quantity: 10,
    case: 'mixed',
    excludedLetters: '',
  });
  const [generatedLetters, setGeneratedLetters] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 100) {
      setOptions({ ...options, quantity: value });
    }
  };

  const handleCaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, case: e.target.value as 'upper' | 'lower' | 'mixed' });
  };

  const handleExcludedLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, excludedLetters: e.target.value.toLowerCase() });
  };

  const generateRandomLetters = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let availableLetters = alphabet.split('');
    
    // Remove excluded letters
    if (options.excludedLetters) {
      const excludedArray = options.excludedLetters.toLowerCase().split('');
      availableLetters = availableLetters.filter(letter => !excludedArray.includes(letter));
    }
    
    // Check if we have any letters left
    if (availableLetters.length === 0) {
      setGeneratedLetters('No letters available after exclusions');
      return;
    }
    
    // Generate random letters
    let result = '';
    for (let i = 0; i < options.quantity; i++) {
      const randomIndex = Math.floor(Math.random() * availableLetters.length);
      let letter = availableLetters[randomIndex];
      
      // Apply case option
      if (options.case === 'upper') {
        letter = letter.toUpperCase();
      } else if (options.case === 'mixed') {
        letter = Math.random() > 0.5 ? letter.toUpperCase() : letter;
      }
      
      result += letter;
    }
    
    setGeneratedLetters(result);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (!generatedLetters || generatedLetters === 'No letters available after exclusions') return;
    
    navigator.clipboard.writeText(generatedLetters)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="random-letter-generator" style={{ 
      backgroundColor: '#f8f9fa', 
      borderRadius: '10px', 
      padding: isMobile ? '15px' : '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div className="generator-options" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="quantity" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Number of Letters (1-100):
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="100"
            value={options.quantity}
            onChange={handleQuantityChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px' // Larger font size on mobile for better touch
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <p style={{ 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Letter Case:
          </p>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '10px' : '15px'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: isMobile ? '5px 0' : '0'
            }}>
              <input
                type="radio"
                name="case"
                value="upper"
                checked={options.case === 'upper'}
                onChange={handleCaseChange}
                style={{ 
                  marginRight: '5px',
                  width: isMobile ? '20px' : '15px',
                  height: isMobile ? '20px' : '15px'
                }}
              />
              Uppercase
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: isMobile ? '5px 0' : '0'
            }}>
              <input
                type="radio"
                name="case"
                value="lower"
                checked={options.case === 'lower'}
                onChange={handleCaseChange}
                style={{ 
                  marginRight: '5px',
                  width: isMobile ? '20px' : '15px',
                  height: isMobile ? '20px' : '15px'
                }}
              />
              Lowercase
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: isMobile ? '5px 0' : '0'
            }}>
              <input
                type="radio"
                name="case"
                value="mixed"
                checked={options.case === 'mixed'}
                onChange={handleCaseChange}
                style={{ 
                  marginRight: '5px',
                  width: isMobile ? '20px' : '15px',
                  height: isMobile ? '20px' : '15px'
                }}
              />
              Mixed
            </label>
          </div>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="excluded" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Exclude Letters (e.g., "aeiou"):
          </label>
          <input
            type="text"
            id="excluded"
            value={options.excludedLetters}
            onChange={handleExcludedLettersChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px' // Larger font size on mobile for better touch
            }}
          />
        </div>
        
        <button 
          onClick={generateRandomLetters}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: isMobile ? '12px 20px' : '10px 20px',
            fontSize: isMobile ? '18px' : '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: isMobile ? '100%' : 'auto',
            marginTop: isMobile ? '10px' : '0'
          }}
        >
          Generate Random Letters
        </button>
      </div>
      
      {generatedLetters && (
        <div className="generator-results" style={{ 
          marginTop: '20px',
          padding: isMobile ? '12px' : '15px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: '10px',
            fontSize: isMobile ? '18px' : '20px'
          }}>
            Generated Letters:
          </h3>
          <div style={{ 
            fontSize: isMobile ? '20px' : '24px', 
            letterSpacing: '2px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            marginBottom: '15px',
            wordBreak: 'break-all',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {generatedLetters}
          </div>
          
          {generatedLetters !== 'No letters available after exclusions' && (
            <button
              onClick={copyToClipboard}
              style={{
                backgroundColor: isCopied ? '#34a853' : '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: isMobile ? '12px 20px' : '8px 15px',
                fontSize: isMobile ? '16px' : '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RandomLetterGenerator;