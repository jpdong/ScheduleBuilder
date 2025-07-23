import React from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import dynamic from 'next/dynamic';
import ResponsiveHero from '../components/yes-no-wheel/client/ResponsiveHero'



const faqs = [
  {
    question: 'How does the Yes/No wheel work?',
    answer: 'The Yes/No wheel is a simple decision-making tool that randomly selects either "Yes" or "No" when you spin it. It uses a fair algorithm to ensure each option has an equal 50% chance of being selected.',
  },
  {
    question: 'Should I really make decisions based on the wheel?',
    answer: 'The wheel is designed for entertainment and can be helpful for breaking decision paralysis on minor choices. For important life decisions, we recommend using it as a starting point for reflection rather than the final decision-maker.',
  },
  {
    question: 'Is the wheel truly random?',
    answer: 'Yes, our wheel uses JavaScript\'s Math.random() function to generate unpredictable results. Each spin has an equal chance of landing on "Yes" or "No" regardless of previous spins.',
  },
  {
    question: 'Can I customize the wheel with more options?',
    answer: 'Currently, the wheel is designed for binary Yes/No decisions. We\'re working on a customizable version that will allow you to add your own options in the future.',
  },
];

const useCases = [
  {
    title: 'Break Decision Paralysis',
    description: 'When you\'re stuck between two equally appealing options, the wheel can help you move forward rather than remaining stuck in indecision.'
  },
  {
    title: 'Fun Party Game',
    description: 'Use the wheel at parties or gatherings to make random decisions like who goes first in a game or which activity to do next.'
  },
  {
    title: 'Creative Prompts',
    description: 'Writers and artists can use the wheel to make random decisions about plot points, character traits, or artistic directions when feeling stuck.'
  }
];

const YesNoWheelPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
        {/* Hero Section with Client Component */}
        <ResponsiveHero />
        
        {/* How It Works Section - Server Rendered */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="how-it-works">
          <Container>
            <SectionTitle>How the Yes/No Wheel Works</SectionTitle>
            <Row gutter={[30, 30]}>
              <Column xs={24} md={8}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '30px 20px',
                  background: '#f9f9f9',
                  borderRadius: '10px',
                  height: '100%',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#e6f7ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '30px',
                    color: '#1890ff'
                  }}>
                    1
                  </div>
                  <h3 style={{ marginBottom: '15px' }}>Ask a Question</h3>
                  <p>Think of or type in a yes/no question that you want answered. Be specific about what you're asking.</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '30px 20px',
                  background: '#f9f9f9',
                  borderRadius: '10px',
                  height: '100%',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#fff0f6', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '30px',
                    color: '#eb2f96'
                  }}>
                    2
                  </div>
                  <h3 style={{ marginBottom: '15px' }}>Spin the Wheel</h3>
                  <p>Click the "Spin" button or directly on the wheel to set it in motion. The wheel will spin randomly.</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '30px 20px',
                  background: '#f9f9f9',
                  borderRadius: '10px',
                  height: '100%',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#f6ffed', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '30px',
                    color: '#52c41a'
                  }}>
                    3
                  </div>
                  <h3 style={{ marginBottom: '15px' }}>Get Your Answer</h3>
                  <p>When the wheel stops, it will land on either "Yes" or "No" - there's your answer! Consider how you feel about the result.</p>
                </div>
              </Column>
            </Row>
          </Container>
        </div>
        
        {/* Use Cases Section - Server Rendered */}
        <div style={{ padding: '80px 0' }} id="use-cases">
          <Container>
            <SectionTitle>When to Use the Yes/No Wheel</SectionTitle>
            <Row gutter={[30, 30]}>
              {useCases.map((useCase, index) => (
                <Column xs={24} md={8} key={index}>
                  <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>{useCase.title}</h3>
                    <p>{useCase.description}</p>
                  </div>
                </Column>
              ))}
            </Row>
          </Container>
        </div>
        
        {/* Psychology Section - Server Rendered */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="psychology">
          <Container>
            <SectionTitle>The Psychology of Random Decisions</SectionTitle>
            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '20px' }}>
                Sometimes, the hardest part of decision-making isn't finding the right answer—it's simply making a choice. 
                Psychologists call this "decision paralysis" or "analysis paralysis," where we get stuck overthinking options.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Random decision tools like our Yes/No wheel can help break this cycle by:
              </p>
              <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Removing the burden of choice</strong> - When options seem equally good or bad, randomizing can relieve the pressure.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Revealing your true preference</strong> - Often, your immediate reaction to the wheel's result can tell you what you really wanted all along.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Creating forward momentum</strong> - Sometimes any decision is better than no decision, especially for minor choices.
                </li>
              </ul>
              <p>
                While we don't recommend using the wheel for major life decisions, it can be a helpful tool for breaking indecision on smaller matters or starting a deeper reflection process.
              </p>
            </div>
          </Container>
        </div>
        
        {/* FAQ Section - Server Rendered */}
        <div style={{ background: '#f9f9f9', padding: '80px 0' }} id="faq">
          <Container>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {faqs.map(f => (
                <div key={f.question} style={{ marginBottom: 30, padding: 20, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: 10 }}>{f.question}</h3>
                  <p style={{ color: '#666', margin: 0 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YesNoWheelPage;