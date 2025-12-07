const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:5000/uploads';

const ROLES = {
    ADMIN: 'admin',
    SUPERADMIN: 'superadmin',
    STUDENT: 'student',
    TEACHER: 'teacher'
};

export { API_URL, UPLOAD_URL, ROLES };
