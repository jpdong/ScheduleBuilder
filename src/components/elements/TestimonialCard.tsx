import React from 'react';

export interface TestimonialCardProps {
  avatar: string;
  name: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, text }) => (
  <div className="card" style={{ marginBottom: 24 }}>
    <div className="card-body">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <img
          src={avatar}
          alt={name}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            marginRight: 16,
            objectFit: 'cover'
          }}
        />
        <div>
          <h4 style={{ fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>{name}</h4>
        </div>
      </div>
      <p style={{ color: '#666', fontSize: '1rem', margin: 0, minHeight: '200px' }}>{text}</p>
    </div>
  </div>
);

export default TestimonialCard;
