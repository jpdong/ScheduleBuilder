import React from 'react';
import Container from '../components/layout/Container';
import Link from 'next/link';
import { FaEnvelope, FaTelegram, FaDiscord, FaTwitter, FaProductHunt } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';

const ContactCard: React.FC<{ icon: React.ReactNode; title: string; link: string; value: string }> = ({ icon, title, link, value }) => (
  <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '10px', textAlign: 'center' }}>
    <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#165DFF' }}>{icon}</div>
    <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{title}</h3>
    <a href={link} style={{ fontSize: '1.1rem', color: '#666', textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
  </div>
);

const ContactUsPage: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <Container>
        <div className="page-content" style={{ padding: '4rem 0', textAlign: 'center' }}>
    
          <h1>Contact Us</h1>
          <p style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
            We'd love to hear from you! Reach out through any of these channels:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>   
            
            <ContactCard
              icon={<FaTwitter />}
              title="Twitter"
              link="https://x.com/JP_DONG"
              value="https://x.com/JP_DONG"
            />
            
            <ContactCard
              icon={<FaEnvelope />}
              title="Email"
              link="mailto:dongshan1025@gmail.com"
              value="dongshan1025@gmail.com"
            />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
