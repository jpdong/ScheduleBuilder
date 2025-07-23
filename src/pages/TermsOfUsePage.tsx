import React from 'react';
import Container from '../components/layout/Container';
import Footer from '../components/elements/Footer';
import NavBar from '../components/elements/NavBar';

const TermsOfUsePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="page-content" style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '20px' }}>Terms of Use</h1>
          <p>
            Last updated: July 21, 2025
          </p>
          <p>
            Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the Schedule Builder website (the "Service") operated by Schedule Builder ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Use of Schedule Builder</h2>
          <p>
            Our Schedule Builder is provided as a free service for personal, educational, business, and other organizational uses. You may use the scheduling tools for various purposes including but not limited to:
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li>Personal event planning and time management</li>
            <li>Business meeting coordination</li>
            <li>Educational and academic scheduling</li>
            <li>Team collaboration and project management</li>
            <li>Social event organization</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Limitations on Use</h2>
          <p>
            While we encourage productive use of our Schedule Builder, you agree not to use the Service:
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To create schedules that promote harmful, threatening, abusive, or otherwise objectionable activities</li>
            <li>To attempt to interfere with or disrupt the service or servers</li>
            <li>For automated or excessive usage that may negatively impact the service for other users</li>
            <li>For any commercial purpose without our prior written consent</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Schedule Builder and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Schedule Builder.
          </p>
          <p>
            The schedule data you create using our service belongs to you. However, by using our service, you grant us a limited license to store, process, and display your schedule data as necessary to provide the service, including sharing functionality.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Data Storage and Privacy</h2>
          <p>
            Schedule Builder primarily stores your schedule data in your browser's local storage. When you choose to share a schedule, that specific schedule is stored on our servers to enable the sharing functionality. We respect your privacy and will only use your data as described in our Privacy Policy. We make no guarantees regarding the permanent availability of your data and recommend exporting important schedules for backup purposes.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Random Letter Generator. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Random Letter Generator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Contact Us</h2>
          <p>
            If you have any questions about these Terms or our Schedule Builder service, please contact us.
          </p>
          <p>
            contact@schedulebuilder.com
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;