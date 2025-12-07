import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import useStore from '../../zustand/store';
import CreateNoticeModal from '../../components/teacher/CreateNoticeModal';
import UploadResultsModal from '../../components/teacher/UploadResultsModal';
import ViewFeedbackModal from '../../components/teacher/ViewFeedbackModal';
import MyCoursesModal from '../../components/teacher/MyCoursesModal';
import StudentsModal from '../../components/teacher/StudentsModal';
import MyAdviseesModal from '../../components/teacher/MyAdviseesModal';
import './Dashboard.css';

const TeacherDashboard = () => {
    const { user } = useStore();
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <>
            <Navbar darkText={true} />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Teacher Dashboard</h1>
                    <p>Welcome, {user?.name || 'Teacher'}!</p>
                </div>

                <div className="dashboard-grid">
                    <Link to="/teacher/profile" className="dashboard-card">
                        <div className="card-icon"></div>
                        <h3>My Profile</h3>
                        <p>View and update your profile</p>
                    </Link>

                    <div className="dashboard-card" onClick={() => setActiveModal('notice')}>
                        <div className="card-icon"></div>
                        <h3>Create Notice</h3>
                        <p>Post notices for students</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('results')}>
                        <div className="card-icon"></div>
                        <h3>Upload Results</h3>
                        <p>Upload student results</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('feedback')}>
                        <div className="card-icon"></div>
                        <h3>View Feedback</h3>
                        <p>See course feedback from students</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('courses')}>
                        <div className="card-icon"></div>
                        <h3>My Courses</h3>
                        <p>View teaching courses</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('students')}>
                        <div className="card-icon"></div>
                        <h3>Students</h3>
                        <p>View student information</p>
                    </div>

                    <div className="dashboard-card" onClick={() => setActiveModal('advisees')}>
                        <div className="card-icon">‍</div>
                        <h3>My Advisees</h3>
                        <p>View assigned students</p>
                    </div>
                </div>
            </div>
            <Footer />

            {}
            <CreateNoticeModal isOpen={activeModal === 'notice'} onClose={closeModal} />
            <UploadResultsModal isOpen={activeModal === 'results'} onClose={closeModal} />
            <ViewFeedbackModal isOpen={activeModal === 'feedback'} onClose={closeModal} />
            <MyCoursesModal isOpen={activeModal === 'courses'} onClose={closeModal} />
            <StudentsModal isOpen={activeModal === 'students'} onClose={closeModal} />
            <MyAdviseesModal isOpen={activeModal === 'advisees'} onClose={closeModal} />
        </>
    );
};

export default TeacherDashboard;
