import { Link } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import ScrollEfect from '../ScrollEfect';


const FormRegistrar = () => {
    const { nombreCompleto, id, correo, telefono, fechaNacimiento, genero, contraseña, handleChange, handleSubmit } = useForm({
        nombreCompleto: '',
        id: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',
        contraseña: '',
        recordatorio: []
    });

    return (
        <ScrollEfect>
            <form className="form formRegistro" onSubmit={handleSubmit}>
                <p className="heading">Crear Cuenta</p>
                <p className='description'>Regístrese ahora y obtenga acceso completo a nuestra aplicación.</p>
                <input className="input" placeholder="Nombre completo" required name='nombreCompleto' value={nombreCompleto} onChange={handleChange} type="text" />
                <input className="input" placeholder="Identificación" required name='id' value={id} onChange={handleChange} type="number" />
                <input className="input" placeholder="Correo" required name='correo' value={correo} onChange={handleChange} type="email" />
                <input className="input" placeholder="Numero de telefono" required name='telefono' value={telefono} onChange={handleChange} type="number" />
                <div className='div-inputs'>
                    <input className="input" name='fechaNacimiento' required value={fechaNacimiento} onChange={handleChange} type="date" />
                    <input className="input" name='genero' placeholder="Sexo" required value={genero} onChange={handleChange} type="text" />
                </div>
                <input className="input" placeholder="Contraseña" required name='contraseña' value={contraseña} onChange={handleChange} type="password" />
                <button className="btn">Registrar Usuario</button>
                <p>Ya tienes una cuenta ? <Link to='/iniciar-sesion'>Iniciar sesión</Link></p>
            </form>
        </ScrollEfect>
    )
}

export default FormRegistrar