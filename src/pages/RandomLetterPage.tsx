import React from 'react';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import TestimonialCard from '../components/elements/TestimonialCard';
import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import ResponsiveHero from '../components/random-letter/client/ResponsiveHero'


const faqs = [
  {
    question: 'What is a random letter generator?',
    answer: 'A random letter generator is a tool that creates random letters based on your specifications. You can choose how many letters you want, whether they should be uppercase, lowercase, or mixed, and even exclude specific letters from the generation.',
  },
  {
    question: 'How can I use randomly generated letters?',
    answer: 'Randomly generated letters have many uses! They\'re great for word games like Scrabble or Boggle, teaching activities, creative writing prompts, password generation, and even randomized testing of applications.',
  },
  {
    question: 'Is the random letter generator truly random?',
    answer: 'Our generator uses JavaScript\'s Math.random() function which provides a high-quality pseudo-random number generator. While not cryptographically secure, it\'s more than random enough for games, teaching, and creative purposes.',
  },
  {
    question: 'Can I use this tool on mobile devices?',
    answer: 'Yes! Our random letter generator is fully responsive and works great on smartphones and tablets, allowing you to generate random letters on the go.',
  },
];

const testimonials = [
  {
    avatar: '/avatars/alex.jpg',
    name: 'Alex',
    text: 'This random letter generator has been a game-changer for my classroom activities. My students love the word games we can create with it!',
  },
  {
    avatar: '/avatars/linda.jpg',
    name: 'Linda',
    text: "I use this tool all the time for my Scrabble practice. Being able to exclude certain letters helps me focus on challenging combinations. Simple and effective!",
  },
  {
    avatar: '/avatars/sam.jpg',
    name: 'Sam',
    text: 'As a game developer, I use this for testing user inputs. The ability to generate specific patterns of random letters saves me so much time.',
  },
  {
    avatar: '/avatars/emily.jpg',
    name: 'Emily',
    text: 'Perfect tool for creative writing exercises! I use the random letters as prompts for my writing students, and it sparks such creative stories.',
  },
];

const RandomLetterPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
        {/* Hero Section */}
        <ResponsiveHero />

        {/* Use Cases Section */}
        <div style={{ padding: '80px 0' }} id="use-cases">
          <Container>
            <SectionTitle>How to Use Random Letters</SectionTitle>
            <Row gutter={[30, 30]}>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Word Games</h3>
                  <p>Challenge yourself with word games like Scrabble, Boggle, or Word Jumble using randomly generated letters. Great for improving vocabulary and having fun!</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Education</h3>
                  <p>Teachers can use random letters for alphabet learning, spelling exercises, vocabulary building, and creative writing prompts in the classroom.</p>
                </div>
              </Column>
              <Column xs={24} md={8}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Creative Projects</h3>
                  <p>Use random letters for art projects, design work, creating unique codes, or as inspiration for creative writing and storytelling.</p>
                </div>
              </Column>
            </Row>
          </Container>
        </div>

        {/* FAQ Section */}
        <div style={{ background: '#fff', padding: '80px 0' }} id="faq">
          <Container>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
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
            <SectionTitle>What Users Say About Our Random Letter Generator</SectionTitle>
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

export default RandomLetterPage;