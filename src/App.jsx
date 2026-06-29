import { useState, useEffect } from 'react';
import { Sun, Moon, Plus, Server, LayoutDashboard, Monitor, Settings } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    AssetID: '',
    Hostname: '',
    MAC_Address: '',
    IP_Address: '',
    Department: ''
  });

  // Toggle Light/Dark Mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Fetch Assets
  const fetchAssets = async () => {
    try {
      const response = await fetch('http://localhost:8000/assets');
      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset)
      });
      
      if (response.ok) {
        setShowModal(false);
        setNewAsset({ AssetID: '', Hostname: '', MAC_Address: '', IP_Address: '', Department: '' });
        fetchAssets(); // Refresh list
      } else {
        alert("Failed to add asset");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: '8px', color: 'white' }}>
            <Server size={24} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>AssetDB</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>
            <Monitor size={20} />
            Hardware
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>
            <Settings size={20} />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Hardware Overview</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your enterprise IT assets in one place.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={20} />
              Add Asset
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Assets</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>{loading ? '-' : assets.length}</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Departments</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>{loading ? '-' : new Set(assets.map(a => a.Department)).size}</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>API Status</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>Online</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Hostname</th>
                <th>MAC Address</th>
                <th>IP Address</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading assets...</td></tr>
              ) : assets.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No assets found.</td></tr>
              ) : (
                assets.map((asset) => (
                  <tr key={asset.AssetID}>
                    <td style={{ fontWeight: '500' }}>{asset.AssetID}</td>
                    <td>{asset.Hostname}</td>
                    <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{asset.MAC_Address}</td>
                    <td style={{ fontFamily: 'monospace' }}>{asset.IP_Address}</td>
                    <td><span className="badge">{asset.Department}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>

      {/* Modal for Adding Asset */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-secondary)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Add New Asset</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Asset ID</label>
                <input className="input-field" required value={newAsset.AssetID} onChange={e => setNewAsset({...newAsset, AssetID: e.target.value})} placeholder="e.g. AST-1050" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hostname</label>
                <input className="input-field" required value={newAsset.Hostname} onChange={e => setNewAsset({...newAsset, Hostname: e.target.value})} placeholder="e.g. FIN-LAP-50" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>MAC Address</label>
                <input className="input-field" required value={newAsset.MAC_Address} onChange={e => setNewAsset({...newAsset, MAC_Address: e.target.value})} placeholder="00:1A:2B..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>IP Address</label>
                <input className="input-field" required value={newAsset.IP_Address} onChange={e => setNewAsset({...newAsset, IP_Address: e.target.value})} placeholder="10.20..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Department</label>
                <input className="input-field" required value={newAsset.Department} onChange={e => setNewAsset({...newAsset, Department: e.target.value})} placeholder="e.g. Finance" />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
                <button type="submit" className="btn-primary">Save Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
