"use client"
import React, { useState, useEffect } from 'react';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';

const ResponsiveHero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
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
  
  return (
    <Container>
      <Row gutter={[40, 40]} align="middle" style={{ padding: '80px 0 40px 0' }}>
        <Column xs={24} md={12}>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            marginBottom: 20, 
            color: '#2c3e50',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Schedule Builder
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: 30, 
            color: '#666',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Create, manage, and share your schedules. View your events in multiple formats, set reminders, and collaborate with others. Simple, efficient, and free to use!
          </p>
          <div style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: '15px',
            marginBottom: '30px'
          }}>
            <button style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}>
              Create Schedule
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#4CAF50',
              border: '1px solid #4CAF50',
              padding: '12px 24px',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              View Examples
            </button>
          </div>
        </Column>
        <Column xs={24} md={12}>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            padding: '20px',
            height: '350px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              borderBottom: '1px solid #eee',
              paddingBottom: '10px'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>July 2025</h3>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>Day</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: 'bold', borderBottom: '2px solid #4CAF50' }}>Week</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>Month</button>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>
                <div style={{ width: '60px', textAlign: 'center', color: '#999' }}>Time</div>
                <div style={{ flex: 1, display: 'flex' }}>
                  <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Mon</div>
                  <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Tue</div>
                  <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Wed</div>
                  <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Thu</div>
                  <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Fri</div>
                </div>
              </div>
              
              {/* 日程项目示例 */}
              <div style={{ display: 'flex', height: '40px', marginBottom: '5px', alignItems: 'center' }}>
                <div style={{ width: '60px', textAlign: 'center', color: '#999' }}>9:00</div>
                <div style={{ flex: 1, display: 'flex', height: '100%' }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1, backgroundColor: '#E3F2FD', borderLeft: '3px solid #2196F3', borderRadius: '3px', padding: '2px 5px', fontSize: '0.8rem' }}>
                    Team Meeting
                  </div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', height: '40px', marginBottom: '5px', alignItems: 'center' }}>
                <div style={{ width: '60px', textAlign: 'center', color: '#999' }}>10:00</div>
                <div style={{ flex: 1, display: 'flex', height: '100%' }}>
                  <div style={{ flex: 1, backgroundColor: '#E8F5E9', borderLeft: '3px solid #4CAF50', borderRadius: '3px', padding: '2px 5px', fontSize: '0.8rem' }}>
                    Client Call
                  </div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1, backgroundColor: '#FFF3E0', borderLeft: '3px solid #FF9800', borderRadius: '3px', padding: '2px 5px', fontSize: '0.8rem' }}>
                    Project Review
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', height: '40px', marginBottom: '5px', alignItems: 'center' }}>
                <div style={{ width: '60px', textAlign: 'center', color: '#999' }}>11:00</div>
                <div style={{ flex: 1, display: 'flex', height: '100%' }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1, backgroundColor: '#F3E5F5', borderLeft: '3px solid #9C27B0', borderRadius: '3px', padding: '2px 5px', fontSize: '0.8rem' }}>
                    Lunch Meeting
                  </div>
                  <div style={{ flex: 1 }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', height: '40px', marginBottom: '5px', alignItems: 'center' }}>
                <div style={{ width: '60px', textAlign: 'center', color: '#999' }}>12:00</div>
                <div style={{ flex: 1, display: 'flex', height: '100%' }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1, backgroundColor: '#FFEBEE', borderLeft: '3px solid #F44336', borderRadius: '3px', padding: '2px 5px', fontSize: '0.8rem' }}>
                    Deadline
                  </div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 1 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Column>
      </Row>
    </Container>
  );
};

export default ResponsiveHero;