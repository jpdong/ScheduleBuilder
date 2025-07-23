"use client"
import React, { useState, useEffect } from 'react';

interface RandomNameOptions {
  gender: 'male' | 'female' | 'any';
  nationality: string;
  length: 'short' | 'medium' | 'long';
  quantity: number;
}

// Sample first names by gender
const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 
         'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
         'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan',
         'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
           'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
           'Carol', 'Amanda', 'Dorothy', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
           'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Nicole', 'Ruth', 'Katherine']
};

// Sample last names
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
                  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
                  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
                  'Chen', 'Kim', 'Wang', 'Singh', 'Li', 'Zhang', 'Patel', 'Gomez', 'Diaz', 'Parker'];

// Sample middle names/initials
const middleNames = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'J.', 'K.',
                     'L.', 'M.', 'N.', 'P.', 'R.', 'S.', 'T.', 'W.', '', ''];

const RandomNameGenerator: React.FC = () => {
  const [options, setOptions] = useState<RandomNameOptions>({
    gender: 'any',
    nationality: 'any',
    length: 'medium',
    quantity: 5
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
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

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({ ...options, gender: e.target.value as 'male' | 'female' | 'any' });
  };

  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({ ...options, nationality: e.target.value });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({ ...options, length: e.target.value as 'short' | 'medium' | 'long' });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 20) {
      setOptions({ ...options, quantity: value });
    }
  };

  const generateRandomNames = () => {
    const names: string[] = [];
    
    for (let i = 0; i < options.quantity; i++) {
      let firstName: string;
      
      // Select first name based on gender
      if (options.gender === 'any') {
        const genderChoice = Math.random() > 0.5 ? 'male' : 'female';
        firstName = firstNames[genderChoice][Math.floor(Math.random() * firstNames[genderChoice].length)];
      } else {
        firstName = firstNames[options.gender][Math.floor(Math.random() * firstNames[options.gender].length)];
      }
      
      // Select last name
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      // Generate name based on length preference
      let fullName: string;
      
      if (options.length === 'short') {
        fullName = `${firstName} ${lastName}`;
      } else if (options.length === 'medium') {
        // 50% chance to add middle initial
        if (Math.random() > 0.5) {
          const middleInitial = middleNames[Math.floor(Math.random() * middleNames.length)];
          fullName = middleInitial ? `${firstName} ${middleInitial} ${lastName}` : `${firstName} ${lastName}`;
        } else {
          fullName = `${firstName} ${lastName}`;
        }
      } else { // long
        const middleInitial = middleNames[Math.floor(Math.random() * middleNames.length)];
        const secondLastName = Math.random() > 0.7 ? ` ${lastNames[Math.floor(Math.random() * lastNames.length)]}` : '';
        fullName = middleInitial 
          ? `${firstName} ${middleInitial} ${lastName}${secondLastName}`
          : `${firstName} ${lastName}${secondLastName}`;
      }
      
      names.push(fullName);
    }
    
    setGeneratedNames(names);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (generatedNames.length === 0) return;
    
    const textToCopy = generatedNames.join('\\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="random-name-generator" style={{ 
      backgroundColor: '#f8f9fa', 
      borderRadius: '10px', 
      padding: isMobile ? '15px' : '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div className="generator-options" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="gender" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Gender:
          </label>
          <select
            id="gender"
            value={options.gender}
            onChange={handleGenderChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px'
            }}
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nationality" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Nationality:
          </label>
          <select
            id="nationality"
            value={options.nationality}
            onChange={handleNationalityChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px'
            }}
          >
            <option value="any">Any</option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="length" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Name Length:
          </label>
          <select
            id="length"
            value={options.length}
            onChange={handleLengthChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px'
            }}
          >
            <option value="short">Short (First Last)</option>
            <option value="medium">Medium (First Middle Last)</option>
            <option value="long">Long (First Middle Last Last)</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="quantity" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Number of Names (1-20):
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="20"
            value={options.quantity}
            onChange={handleQuantityChange}
            style={{ 
              width: '100%', 
              padding: isMobile ? '10px' : '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: isMobile ? '16px' : '14px'
            }}
          />
        </div>
        
        <button 
          onClick={generateRandomNames}
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
          Generate Random Names
        </button>
      </div>
      
      {generatedNames.length > 0 && (
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
            Generated Names:
          </h3>
          <ul style={{ 
            listStyleType: 'none',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: '1.6'
          }}>
            {generatedNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          
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
        </div>
      )}
    </div>
  );
};

export default RandomNameGenerator;