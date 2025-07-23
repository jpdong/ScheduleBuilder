import React from 'react';

export interface FeatureCardProps {
  img: string;
  title: string;
  alt:string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ img, title,alt, desc }) => (
  <div className="card" style={{ marginBottom: 24 }}>
    <div className="card-cover">
      <img alt={alt} src={img} />
    </div>
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{desc}</p>
    </div>
  </div>
);

export default FeatureCard;
