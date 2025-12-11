import { useState } from 'react';
import Modal from '../Modal/Modal';
import './AdminModals.css';

const ManageAdmissionsModal = ({ isOpen, onClose }) => {
    const [admissionInfo, setAdmissionInfo] = useState({
        title: '',
        description: '',
        eligibility: '',
        deadline: '',
        link: ''
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            // TODO: Implement API call to save admission info
            // const response = await adminService.updateAdmissionInfo(admissionInfo);

            // Temporary success message
            setSuccess('Admission information updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update admission information');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmissionInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Manage Admissions"
            size="medium"
        >
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="title">Admission Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={admissionInfo.title}
                        onChange={handleChange}
                        placeholder="e.g., Undergraduate Admission 2024"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={admissionInfo.description}
                        onChange={handleChange}
                        placeholder="Enter admission details..."
                        rows={4}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="eligibility">Eligibility Criteria</label>
                    <textarea
                        id="eligibility"
                        name="eligibility"
                        value={admissionInfo.eligibility}
                        onChange={handleChange}
                        placeholder="Enter eligibility requirements..."
                        rows={3}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deadline">Application Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={admissionInfo.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Application Link</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={admissionInfo.link}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ManageAdmissionsModal;
