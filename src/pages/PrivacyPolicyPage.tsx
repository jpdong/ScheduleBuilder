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
            Schedule Builder ("us", "we", or "our") operates the Schedule Builder website (the "Service").
          </p>
          <p>
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Information Collection and Use</h2>
          <p>
            We collect minimal information to provide and improve our Schedule Builder Service to you. We store your schedule data to enable features like sharing and notifications, but we prioritize your privacy throughout this process.
          </p>

          <h3 style={{ fontSize: '1.25rem', color: '#2c3e50', margin: '20px 0 10px' }}>Types of Data Collected</h3>
          <h4 style={{ fontSize: '1.1rem', color: '#2c3e50', margin: '15px 0 10px' }}>Schedule Data</h4>
          <p>
            When you create schedules, we store this information in your browser's local storage. This data includes event titles, descriptions, dates, times, and reminder settings. This information is primarily stored locally on your device and is only transmitted to our servers when you choose to share a schedule.
          </p>
          <h4 style={{ fontSize: '1.1rem', color: '#2c3e50', margin: '15px 0 10px' }}>Usage Data</h4>
          <p>
            We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. This information helps us understand how users interact with our schedule builder and improve its functionality.
          </p>
          <h4 style={{ fontSize: '1.1rem', color: '#2c3e50', margin: '15px 0 10px' }}>Tracking & Cookies Data</h4>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. These cookies help us remember your schedule preferences (such as default view settings or notification preferences) to improve your user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Use of Data</h2>
          <p>
            Schedule Builder uses the collected data for various purposes:
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li>To provide and maintain the Service</li>
            <li>To enable schedule sharing functionality</li>
            <li>To deliver notifications and reminders for your events</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '30px 0 15px' }}>Schedule Data Privacy</h2>
          <p>
            Your schedule data is primarily stored in your browser's local storage. When you choose to share a schedule, only the specific shared schedule is stored on our servers to enable access via the sharing link. We do not analyze, sell, or otherwise use your schedule data beyond providing the core functionality of our service.
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
            If you have any questions about this Privacy Policy or our Schedule Builder service, please contact us.
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

export default PrivacyPolicyPage;