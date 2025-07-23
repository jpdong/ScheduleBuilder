import SectionTitle from '../components/elements/SectionTitle';
import Container from '../components/layout/Container';

const HotArea = () => {
    return (
        <div style={{ background: '#fff', padding: '80px 0' }} id="hot-content">
        <Container>
          <SectionTitle>Hot Apps And Games</SectionTitle>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            {/* Instagram */}
            <a className="card" href="/hot-apps/instagram" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              📸 Instagram
            </a>
            
            {/* Facebook */}
            <a className="card" href="/hot-apps/facebook" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              👥 Facebook
            </a>
            
            {/* Twitter */}
            <a className="card" href="/hot-apps/twitter" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              🐦 Twitter (X)
            </a>
            
            {/* Spotify */}
            <a  className="card" href="/hot-apps/spotify" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              🎶 Spotify
            </a>
            
            {/* Roblox */}
            <a  className="card" href="/hot-games/roblox" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              🧱 Roblox
            </a>
            
            {/* Grow a Garden */}
            <a  className="card" href="/hot-games/growagarden" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#2c3e50',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              🌱 Grow a Garden
            </a>
            
            {/* View All Apps */}
            <a  className="card" href="/hot-apps" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#3498db',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              Discover All Apps →
            </a>
            
            {/* View All Games */}
            <a  className="card" href="/hot-games" style={{
              display: 'block',
              padding: '15px 20px',
              background: '#9b59b6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
              Discover All Games →
            </a>
          </div>
        </Container>
      </div>
    )
}

export default HotArea;