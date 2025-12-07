import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import teacherAuthService from '../api/services/teacherAuthService';
import './Faculty.css';

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await teacherAuthService.getApprovedTeachers();
      console.log(response)
      if (response.success) {
        setTeachers(response.data);
      }
    } catch (err) {
      setError('Failed to load faculty members');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar darkText={true} />
      <div className="faculty-page">
        <div className="faculty-hero">
          <h1>Our Faculty</h1>
          <p>Meet our distinguished faculty members</p>
        </div>

        <div className="container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="teachers-grid">
              {teachers.map((teacher) => (
                <div key={teacher._id} className="teacher-card">
                  <div className="teacher-image">
                    {teacher.profileImage ? (
                      <img src={teacher.profileImage} alt={teacher.name} />
                    ) : (
                      <div className="teacher-placeholder">
                        {teacher.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="designation">{teacher.designation}</p>
                    <p className="department">{teacher.department}</p>
                    <p className="email">{teacher.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faculty;
