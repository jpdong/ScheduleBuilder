import React from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import TestimonialCard from '../components/elements/TestimonialCard';
import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import ResponsiveHero from '../components/schedule-builder/client/ResponsiveHero';
import { ScheduleProvider } from '../components/schedule-builder/context/ScheduleContext';
import ScheduleBuilderApp from '../components/schedule-builder/client/ScheduleBuilderApp';

const faqs = [
  {
    question: 'What is Schedule Builder?',
    answer: 'Schedule Builder is a powerful tool that helps you create, manage, and share your schedules. You can add events, set reminders, choose different views (day, week, month) to view your schedule, and share your arrangements with others.',
  },
  {
    question: 'How do I create a new event?',
    answer: 'Creating a new event is simple! Click the "Create New Event" button, fill in the title, description, start and end times, set reminders as needed, and save. Your new event will appear in your schedule list and calendar view.',
  },
  {
    question: 'Can I share my schedule with others?',
    answer: 'Absolutely! On the event details page, click the "Share" button to generate a sharing link. You can set permissions (read-only or editable) and optionally set an expiration time. Anyone with the link can view your shared schedule.',
  },
  {
    question: 'How do I set event reminders?',
    answer: 'When creating or editing an event, you can select notification times in the reminder section (such as 5 minutes, 15 minutes, 1 hour before the event). As long as you\'ve authorized browser notifications, you\'ll receive reminders at the set times even when the website isn\'t open.',
  },
];

const testimonials = [
  {
    avatar: '/avatars/alex.jpg',
    name: 'Alex',
    text: 'This Schedule Builder tool is fantastic! The interface is clean and intuitive, making it very convenient to use. I can now manage my time much better.',
  },
  {
    avatar: '/avatars/linda.jpg',
    name: 'Linda',
    text: 'The Schedule Builder export feature is incredibly useful. I can easily coordinate meeting times with team members. The reminder function ensures I never miss important events.',
  },
  {
    avatar: '/avatars/sam.jpg',
    name: 'Sam',
    text: 'As a busy student, this Schedule Builder tool helps me schedule classes, study sessions, and social activities. The different view options allow me to flexibly review my schedule.',
  },
  {
    avatar: '/avatars/emily.jpg',
    name: 'Emily',
    text: 'Simple to use yet powerful. I especially love being able to switch between different views, giving me a clearer understanding of my time management.',
  },
];

const ScheduleBuilderPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
        {/* Hero Section */}
        <ResponsiveHero />

        {/* App Section */}
        <div style={{ padding: '40px 0' }} id="app">
          <Container>
            <ScheduleProvider>
              <ScheduleBuilderApp />
            </ScheduleProvider>
          </Container>
        </div>

        {/* Features Section */}
        <div style={{ padding: '80px 0' }} id="features">
          <Container>
            <SectionTitle>Schedule Builder Features</SectionTitle>
            <Row gutter={[30, 30]}>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Multi-View Calendar</h3>
                  <p>View your schedule in daily, weekly, or monthly formats. Navigate easily between different time periods to get the perspective that best suits your needs.</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Smart Notifications</h3>
                  <p>Set custom reminders to ensure you never miss important meetings or events. Receive browser notifications even when the website isn't open.</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Easy Sharing</h3>
                  <p>Generate sharing links to share your schedule with friends, family, or colleagues. Set permission controls and expiration times to protect your privacy.</p>
                </div>
              </Column>
            </Row>
          </Container>
        </div>

        {/* FAQ Section */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="faq">
          <Container>
            <SectionTitle>Frequently Asked Questions About Schedule Builder</SectionTitle>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {faqs.map(f => (
                <div key={f.question} style={{ marginBottom: 30, padding: 20, background: '#f9f9f9', borderRadius: 10 }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: 10 }}>{f.question}</h3>
                  <p style={{ color: '#666', margin: 0 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Testimonials Section */}
        <div style={{ background: '#f9f9f9', padding: '80px 0' }} id="testimonials">
          <Container>
            <SectionTitle>User Testimonials with Schedule Builder</SectionTitle>
            <Row gutter={[30, 30]}>
              {testimonials.map(t => (
                <Column xs={24} md={12} lg={6} key={t.name}>
                  <TestimonialCard {...t} />
                </Column>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ScheduleBuilderPage;