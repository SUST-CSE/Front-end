import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import './AdminModals.css';

const StatisticsModal = ({ isOpen, onClose }) => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalFaculty: 0,
        totalCourses: 0,
        totalNews: 0,
        totalNotices: 0,
        recentRegistrations: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchStatistics();
        }
    }, [isOpen]);

    const fetchStatistics = async () => {
        setLoading(true);
        setError('');

        try {
            // TODO: Implement API calls to fetch statistics
            // const response = await adminService.getStatistics();

            // Temporary mock data
            setStats({
                totalStudents: 500,
                totalFaculty: 45,
                totalCourses: 120,
                totalNews: 25,
                totalNotices: 18,
                recentRegistrations: 42
            });
        } catch (err) {
            setError(err.message || 'Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon }) => (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <h4>{title}</h4>
                <p className="stat-value">{loading ? '...' : value}</p>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="System Statistics"
            size="large"
            footer={
                <button onClick={fetchStatistics} className="btn-primary">
                    Refresh Statistics
                </button>
            }
        >
            {error && <div className="error-message">{error}</div>}

            <div className="statistics-grid">
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon="👨‍🎓"
                />
                <StatCard
                    title="Total Faculty"
                    value={stats.totalFaculty}
                    icon="👨‍🏫"
                />
                <StatCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon="📚"
                />
                <StatCard
                    title="News Articles"
                    value={stats.totalNews}
                    icon="📰"
                />
                <StatCard
                    title="Active Notices"
                    value={stats.totalNotices}
                    icon="📢"
                />
                <StatCard
                    title="Recent Registrations"
                    value={stats.recentRegistrations}
                    icon="📝"
                />
            </div>

            <div className="stats-info">
                <p className="help-text">
                    📊 Statistics are updated in real-time. Click "Refresh Statistics" to get the latest data.
                </p>
            </div>
        </Modal>
    );
};

export default StatisticsModal;
