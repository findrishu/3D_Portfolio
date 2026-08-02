import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

interface VisitorLog {
  id: string;
  ip: string;
  os: string;
  location: string;
  userAgent: string;
  timestamp: any;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'logs' | 'content'>('logs');
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [aboutMe, setAboutMe] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Logs
      const logsQuery = query(collection(db, 'visitorLogs'), orderBy('timestamp', 'desc'), limit(50));
      const querySnapshot = await getDocs(logsQuery);
      const logsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VisitorLog[];
      setLogs(logsData);

      // Fetch Content
      const contentDoc = await getDoc(doc(db, 'siteContent', 'main'));
      if (contentDoc.exists()) {
        const data = contentDoc.data();
        setAboutMe(data.aboutMe || '');
        setSkillsStr(data.skills ? data.skills.join(', ') : '');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const skillsArray = skillsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
      await setDoc(doc(db, 'siteContent', 'main'), {
        aboutMe,
        skills: skillsArray
      }, { merge: true });
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-container">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-card admin-dashboard-card">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} className="admin-btn" style={{ width: 'auto' }}>Logout</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            Visitor Logs
          </button>
          <button 
            className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Manage Content
          </button>
        </div>

        {activeTab === 'logs' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>IP Address</th>
                  <th>Location</th>
                  <th>OS / Device</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center' }}>No logs found.</td></tr>
                ) : (
                  logs.map(log => {
                    const date = log.timestamp?.toDate ? log.timestamp.toDate() : new Date(log.timestamp);
                    return (
                      <tr key={log.id}>
                        <td>{date.toLocaleString()}</td>
                        <td>{log.ip}</td>
                        <td>{log.location}</td>
                        <td>{log.os}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent}>
            <div className="admin-form-group">
              <label>About Me (Description)</label>
              <textarea 
                rows={5}
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Motivated and fast-learning fresher..."
              />
            </div>
            <div className="admin-form-group">
              <label>Web Dev Skills (Comma separated)</label>
              <input 
                type="text" 
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="React.js, JavaScript, Tailwind CSS..."
              />
            </div>
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
