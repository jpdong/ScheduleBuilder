import React from 'react';
import Container from '../components/layout/Container';
import Footer from '../components/elements/Footer';
import NavBar from '../components/elements/NavBar';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="page-content" style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '20px' }}>Privacy Policy</h1>
          <p>
            Last updated: July 21, 2025
          </p>
          <p>
            Random Letter Generator ("us", "we", or "our") operates the Random Letter Generator website (the "Service").
          </p>
          <p>
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Information Collection and Use</h2>
          <p>
            We collect minimal information to provide and improve our Random Letter Generator Service to you. Our letter generation process happens entirely in your browser and does not require the transmission of any personal data to our servers.
          </p>

          <h3 style={{ fontSize: '1.25rem', color: '#2c3e50', margin: '20px 0 10px' }}>Types of Data Collected</h3>
          <h4 style={{ fontSize: '1.1rem', color: '#2c3e50', margin: '15px 0 10px' }}>Usage Data</h4>
          <p>
            We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. This information helps us understand how users interact with our random letter generator and improve its functionality.
          </p>
          <h4 style={{ fontSize: '1.1rem', color: '#2c3e50', margin: '15px 0 10px' }}>Tracking & Cookies Data</h4>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. These cookies help us remember your letter generation preferences (such as case preferences or excluded letters) to improve your user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Use of Data</h2>
          <p>
            Random Letter Generator uses the collected data for various purposes:
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To improve our random letter generation algorithms</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Letter Generation Privacy</h2>
          <p>
            Our random letter generation process happens entirely within your browser. The letters you generate, any customization options you select, and any text you copy are not stored on our servers or transmitted to us. This ensures your generated content remains private to you.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect any data we collect, we cannot guarantee its absolute security.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our Random Letter Generator service, please contact us.
          </p>
          <p>
            contact@randomlettergenerator.com
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;