import React from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import Container from '../components/layout/Container';
import { ScheduleProvider } from '../components/schedule-builder/context/ScheduleContext';
import SharedScheduleView from '../components/schedule-builder/client/SharedScheduleView';

interface SharedSchedulePageProps {
  shareId: string;
}

const SharedSchedulePage: React.FC<SharedSchedulePageProps> = ({ shareId }) => {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh', padding: '40px 0' }}>
        <Container>
          <h1 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '30px', 
            color: '#2c3e50',
            textAlign: 'center'
          }}>
            分享的日程
          </h1>
          
          <ScheduleProvider>
            <SharedScheduleView shareId={shareId} />
          </ScheduleProvider>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SharedSchedulePage;