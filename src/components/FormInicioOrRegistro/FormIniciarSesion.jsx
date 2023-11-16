import { Link } from 'react-router-dom';
import useLogin from '../../hook/useLogin';

const FormIniciarSesion = () => {
    const { id, contraseña, handleChange, handleSubmit } = useLogin({
        id: '',
        contraseña: ''
    }); 
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="heading">Iniciar Sesión</p>
            <p className='description'>Iniciar Sesión ahora y obtenga acceso completo a nuestra aplicación.</p>
            <input className="input" name='id' value={id} onChange={handleChange} placeholder="Identificacion" type="number" required />
            <input className="input" name='contraseña' value={contraseña} onChange={handleChange} placeholder="Contraseña" type="password" required />
            <button className="btn">Iniciar Sesión</button>
            <p>No tienes cuenta ? <Link to='/registrar-usuario'>Registrar Usuario</Link></p>
        </form>
    )
}

export default FormIniciarSesion