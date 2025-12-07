import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import useStore from '../../zustand/store';
import MyResultsModal from '../../components/student/MyResultsModal';
import MyAdvisorModal from '../../components/student/MyAdvisorModal';
import NoticesModal from '../../components/student/NoticesModal';
import SubmitFeedbackModal from '../../components/student/SubmitFeedbackModal';
import CoursesModal from '../../components/student/CoursesModal';
import './Dashboard.css';

const StudentDashboard = () => {
    const { user } = useStore();
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <>
            <Navbar darkText={true} />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Student Dashboard</h1>
                    <p>Welcome, {user?.name || 'Student'}!</p>
                </div>

                <div className="dashboard-grid">
                    <Link to="/student/profile" className="dashboard-card">
                        <div className="card-icon"></div>
                        <h3>My Profile</h3>
                        <p>View and update your profile</p>
                    </Link>

                    <div className="dashboard-card" onClick={() => setActiveModal('results')}>
                        <div className="card-icon"></div>
                        <h3>My Results</h3>
                        <p>View your exam results</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('advisor')}>
                        <div className="card-icon">‍</div>
                        <h3>My Advisor</h3>
                        <p>View your assigned advisor</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('notices')}>
                        <div className="card-icon"></div>
                        <h3>Notices</h3>
                        <p>View important notices</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('feedback')}>
                        <div className="card-icon"></div>
                        <h3>Submit Feedback</h3>
                        <p>Provide course feedback</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('courses')}>
                        <div className="card-icon"></div>
                        <h3>Courses</h3>
                        <p>View course information</p>
                    </div>
                </div>
            </div>
            <Footer />

            {}
            <MyResultsModal isOpen={activeModal === 'results'} onClose={closeModal} />
            <MyAdvisorModal isOpen={activeModal === 'advisor'} onClose={closeModal} />
            <NoticesModal isOpen={activeModal === 'notices'} onClose={closeModal} />
            <SubmitFeedbackModal isOpen={activeModal === 'feedback'} onClose={closeModal} />
            <CoursesModal isOpen={activeModal === 'courses'} onClose={closeModal} />
        </>
    );
};

export default StudentDashboard;
