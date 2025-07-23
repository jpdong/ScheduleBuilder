import React from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import TestimonialCard from '../components/elements/TestimonialCard';
import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import dynamic from 'next/dynamic';
import ResponsiveHero from '../components/random-name/client/ResponsiveHero'


const faqs = [
  {
    question: 'What is a random name generator?',
    answer: 'A random name generator is a tool that creates fictional names based on your specifications. You can choose gender, nationality, name length, and how many names you want to generate at once.',
  },
  {
    question: 'How can I use randomly generated names?',
    answer: 'Random names are perfect for creative writing, character development in stories or games, placeholder names in design mockups, testing software applications, or even brainstorming baby names!',
  },
  {
    question: 'Are the generated names real people?',
    answer: 'No, our generator creates fictional names by combining common first and last names. Any resemblance to real persons is coincidental. The names are randomly generated and not connected to real identities.',
  },
  {
    question: 'Can I use these names for my book/game/project?',
    answer: 'Yes! The names generated are free to use in your creative projects. Since they are randomly generated combinations, they are not subject to copyright restrictions.',
  },
];

const testimonials = [
  {
    avatar: '/avatars/alex.jpg',
    name: 'Alex',
    text: 'This random name generator saved me so much time when creating characters for my novel. The different name length options are especially helpful!',
  },
  {
    avatar: '/avatars/linda.jpg',
    name: 'Linda',
    text: "I use this tool for my D&D campaigns to quickly generate NPCs. My players love the variety of names I come up with now!",
  },
  {
    avatar: '/avatars/sam.jpg',
    name: 'Sam',
    text: 'As a UX designer, I need placeholder names all the time for mockups. This generator is simple and gives me exactly what I need without any fuss.',
  },
  {
    avatar: '/avatars/emily.jpg',
    name: 'Emily',
    text: 'I teach creative writing, and my students use this tool to help overcome writer\'s block when developing characters. It\'s become an essential classroom resource!',
  },
];

const useCases = [
  {
    title: 'Creative Writing',
    description: 'Generate character names for novels, short stories, scripts, or any creative writing project. Find the perfect name to bring your characters to life.'
  },
  {
    title: 'Game Development',
    description: 'Create names for NPCs (non-player characters) in video games, tabletop RPGs, or other gaming scenarios that require a large cast of characters.'
  },
  {
    title: 'Design Mockups',
    description: 'Add realistic user names to UI/UX design prototypes, wireframes, or any design that needs to simulate real user data.'
  }
];

const RandomNamePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
        {/* Hero Section with Client Component */}
        <ResponsiveHero />
        
        {/* Use Cases Section - Server Rendered */}
        <div style={{ padding: '80px 0' }} id="use-cases">
          <Container>
            <SectionTitle>How to Use Random Names</SectionTitle>
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
        
        {/* Name Types Section - Server Rendered */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="name-types">
          <Container>
            <SectionTitle>Types of Names You Can Generate</SectionTitle>
            <Row gutter={[30, 30]}>
              <Column xs={24} md={6}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#e6f7ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '24px',
                    color: '#1890ff'
                  }}>
                    M
                  </div>
                  <h3>Male Names</h3>
                  <p>Common and unique male first names paired with appropriate surnames.</p>
                </div>
              </Column>
              <Column xs={24} md={6}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#fff0f6', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '24px',
                    color: '#eb2f96'
                  }}>
                    F
                  </div>
                  <h3>Female Names</h3>
                  <p>Diverse female first names combined with a variety of last names.</p>
                </div>
              </Column>
              <Column xs={24} md={6}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#f6ffed', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '24px',
                    color: '#52c41a'
                  }}>
                    S
                  </div>
                  <h3>Short Names</h3>
                  <p>Simple first and last name combinations for clean, straightforward naming.</p>
                </div>
              </Column>
              <Column xs={24} md={6}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: '#fffbe6', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '24px',
                    color: '#faad14'
                  }}>
                    L
                  </div>
                  <h3>Long Names</h3>
                  <p>Complex names with middle names or multiple surnames for more formal contexts.</p>
                </div>
              </Column>
            </Row>
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
        
        {/* Testimonials Section - Server Rendered */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="testimonials">
          <Container>
            <SectionTitle>What Users Say About Our Random Name Generator</SectionTitle>
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

export default RandomNamePage;