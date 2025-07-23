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
    question: '什么是日程安排构建器？',
    answer: '日程安排构建器是一个工具，可以帮助您创建、管理和分享您的日程安排。您可以添加事件、设置提醒、选择不同的视图（日、周、月）来查看您的日程，并与他人分享您的安排。',
  },
  {
    question: '如何创建新的日程？',
    answer: '创建新日程非常简单！点击"创建新日程"按钮，填写标题、描述、开始和结束时间，根据需要设置提醒，然后保存即可。您的新日程将显示在您的日程列表和日历视图中。',
  },
  {
    question: '我可以与他人分享我的日程吗？',
    answer: '当然可以！在日程详情页面，点击"分享"按钮，您可以生成一个分享链接，设置权限（只读或可编辑），并可选择设置过期时间。收到链接的人可以查看您分享的日程。',
  },
  {
    question: '如何设置日程提醒？',
    answer: '在创建或编辑日程时，您可以在提醒部分选择提前通知的时间（如5分钟、15分钟、1小时等）。只要您授权了浏览器通知权限，即使您未打开网站，也会在设定的时间收到提醒。',
  },
];

const testimonials = [
  {
    avatar: '/avatars/alex.jpg',
    name: '小李',
    text: '这个日程安排工具太棒了！界面简洁明了，使用起来非常方便。我现在可以更好地管理我的时间了。',
  },
  {
    avatar: '/avatars/linda.jpg',
    name: '小王',
    text: '分享功能非常实用，我可以轻松地与团队成员协调会议时间。提醒功能确保我不会错过重要事项。',
  },
  {
    avatar: '/avatars/sam.jpg',
    name: '小张',
    text: '作为一个忙碌的学生，这个工具帮助我安排课程、学习和社交活动。不同的视图选项让我可以灵活地查看我的安排。',
  },
  {
    avatar: '/avatars/emily.jpg',
    name: '小陈',
    text: '简单易用且功能强大。我特别喜欢可以在不同视图之间切换，让我对时间安排有更清晰的认识。',
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
            <SectionTitle>日程安排功能</SectionTitle>
            <Row gutter={[30, 30]}>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>多视图日历</h3>
                  <p>以日、周、月视图查看您的日程安排，轻松导航到不同的时间段，获得最适合您需求的视角。</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>提醒通知</h3>
                  <p>设置自定义提醒，确保您不会错过重要的会议或事件。即使您未打开网站，也能收到浏览器通知。</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>简便分享</h3>
                  <p>生成分享链接，与朋友、家人或同事分享您的日程安排，设置权限控制和过期时间，保护您的隐私。</p>
                </div>
              </Column>
            </Row>
          </Container>
        </div>

        {/* FAQ Section */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="faq">
          <Container>
            <SectionTitle>常见问题</SectionTitle>
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
            <SectionTitle>用户评价</SectionTitle>
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