import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const logged = localStorage.getItem('Sesion Iniciada');
    
    if (!logged) {
        return <Navigate to='/iniciar-sesion' />
    }
    
    return (
        <Outlet />
    );
};

export default ProtectedRoute