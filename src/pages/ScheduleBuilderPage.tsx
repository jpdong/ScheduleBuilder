"use client"
import React, { useRef } from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import TestimonialCard from '../components/elements/TestimonialCard';
import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import ResponsiveHero from '../components/schedule-builder/client/ResponsiveHero';
import AppleScheduleBuilderApp from '../components/schedule-builder/apple';
import html2canvas from 'html2canvas';

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
  const scheduleBuilderRef = useRef<HTMLDivElement>(null);
  const [showImagePreview, setShowImagePreview] = React.useState(false);
  const [previewImageUrl, setPreviewImageUrl] = React.useState<string>('');

  const handleExportImage = async () => {
    if (!scheduleBuilderRef.current) return;
    
    try {
      // 找到主内容区域，保留除了 new 按钮之外的所有内容
      const mainContent = scheduleBuilderRef.current.querySelector('.apple-main-content');
      if (!mainContent) {
        alert('Could not find schedule content to export.');
        return;
      }

      // 临时隐藏 new 按钮
      const addButton = mainContent.querySelector('.apple-add-button');
      const originalDisplay = addButton ? (addButton as HTMLElement).style.display : null;
      if (addButton) {
        (addButton as HTMLElement).style.display = 'none';
      }

      // 临时修复事件卡片样式，确保在截图中正确显示
      const eventCards = mainContent.querySelectorAll('.apple-event-card');
      const originalEventStyles: Array<{
        border: string;
        borderRadius: string;
        background: string;
        padding: string;
        width: string;
        boxSizing: string;
        textAlign: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
      }> = [];
      
      eventCards.forEach((card, index) => {
        const element = card as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        
        originalEventStyles[index] = {
          border: element.style.border,
          borderRadius: element.style.borderRadius,
          background: element.style.background,
          padding: element.style.padding,
          width: element.style.width,
          boxSizing: element.style.boxSizing,
          textAlign: element.style.textAlign,
          display: element.style.display,
          flexDirection: element.style.flexDirection,
          alignItems: element.style.alignItems,
          justifyContent: element.style.justifyContent
        };
        
        // 使用计算后的样式值，保持原始尺寸和布局
        element.style.border = `${computedStyle.borderWidth} solid rgba(60, 60, 67, 0.36)`;
        element.style.borderRadius = computedStyle.borderRadius;
        element.style.background = '#FFFFFF';
        element.style.padding = computedStyle.padding;
        element.style.width = computedStyle.width;
        element.style.boxSizing = 'border-box';
        
        // 确保文本对齐和布局保持原样
        element.style.textAlign = computedStyle.textAlign || 'left';
        element.style.display = computedStyle.display;
        element.style.flexDirection = computedStyle.flexDirection;
        element.style.alignItems = computedStyle.alignItems;
        element.style.justifyContent = computedStyle.justifyContent;
      });

      const canvas = await html2canvas(mainContent as HTMLElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        height: (mainContent as HTMLElement).scrollHeight,
        width: (mainContent as HTMLElement).scrollWidth,
      });

      // 恢复原始样式
      if (addButton && originalDisplay !== null) {
        (addButton as HTMLElement).style.display = originalDisplay;
      } else if (addButton) {
        (addButton as HTMLElement).style.display = '';
      }
      
      // 恢复事件卡片样式
      eventCards.forEach((card, index) => {
        const element = card as HTMLElement;
        const original = originalEventStyles[index];
        element.style.border = original.border || '';
        element.style.borderRadius = original.borderRadius || '';
        element.style.background = original.background || '';
        element.style.padding = original.padding || '';
        element.style.width = original.width || '';
        element.style.boxSizing = original.boxSizing || '';
        element.style.textAlign = original.textAlign || '';
        element.style.display = original.display || '';
        element.style.flexDirection = original.flexDirection || '';
        element.style.alignItems = original.alignItems || '';
        element.style.justifyContent = original.justifyContent || '';
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setPreviewImageUrl(imageUrl);
      setShowImagePreview(true);
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to export image. Please try again.');
    }
  };

  const handleDownloadImage = () => {
    if (!previewImageUrl) return;
    
    const link = document.createElement('a');
    link.download = `schedule-${new Date().toISOString().split('T')[0]}.png`;
    link.href = previewImageUrl;
    link.click();
    setShowImagePreview(false);
    setPreviewImageUrl('');
  };

  const handleClosePreview = () => {
    setShowImagePreview(false);
    setPreviewImageUrl('');
  };

  const handlePrint = () => {
    if (!scheduleBuilderRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const scheduleHtml = scheduleBuilderRef.current.outerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Schedule - ${new Date().toISOString().split('T')[0]}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .apple-schedule-builder { box-shadow: none !important; }
            }
          </style>
          <link rel="stylesheet" href="/src/components/schedule-builder/apple/apple-styles.css">
        </head>
        <body>
          ${scheduleHtml}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
        {/* Hero Section */}
        <ResponsiveHero />

        {/* App Section */}
        <div style={{ padding: '40px 0' }} id="app">
          <Container>
            {/* Export and Print Buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px', 
              marginBottom: '20px',
              paddingRight: '20px'
            }}>
              <button
                onClick={handleExportImage}
                style={{
                  background: '#007AFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(0,122,255,0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0056CC';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#007AFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📷 Export Image
              </button>
            </div>
            
            <div ref={scheduleBuilderRef}>
              <AppleScheduleBuilderApp />
            </div>
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
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: '90vw',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid #E5E5EA'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#1D1D1F'
              }}>
                Image Preview
              </h3>
              <button
                onClick={handleClosePreview}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  width: '32px',
                  height: '32px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F2F2F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                ×
              </button>
            </div>
            
            {/* Image Preview */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
              flex: 1,
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <img 
                src={previewImageUrl} 
                alt="Schedule Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  borderRadius: '8px',
                  border: '1px solid #E5E5EA',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  display: 'block'
                }}
                onLoad={(e) => {
                  // 确保图片完全显示，类似 Android centerInside
                  const img = e.target as HTMLImageElement;
                  const container = img.parentElement;
                  if (container) {
                    const containerWidth = container.clientWidth - 32; // 减去padding
                    const containerHeight = container.clientHeight - 32;
                    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
                    const containerAspectRatio = containerWidth / containerHeight;
                    
                    // 重置样式
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    
                    // 根据比例决定缩放方式
                    if (imgAspectRatio > containerAspectRatio) {
                      // 图片比容器更宽，以宽度为限制
                      img.style.width = `${containerWidth}px`;
                      img.style.height = 'auto';
                    } else {
                      // 图片比容器更高，以高度为限制
                      img.style.width = 'auto';
                      img.style.height = `${containerHeight}px`;
                    }
                  }
                }}
              />
            </div>
            
            {/* Modal Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleClosePreview}
                style={{
                  background: '#F2F2F7',
                  color: '#1D1D1F',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E5E5EA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F2F2F7';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadImage}
                style={{
                  background: '#007AFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0056CC';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#007AFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📱 Download Image
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default ScheduleBuilderPage;