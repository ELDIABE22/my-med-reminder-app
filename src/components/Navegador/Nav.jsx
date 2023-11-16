import LogoUsuario from '../../assets/logo-usuario.png'
import '../../style/nav/nav.scss'
import BotonCerrarSesion from './BotonCerrarSesion'
import BotonesNav from './BotonesNav'

const Nav = () => {
    const dataLogged = JSON.parse(localStorage.getItem('Sesion Iniciada'));
    return (
        <nav>
            <div className="contenedor-nav">
                <div className="nombre-usuario">
                    <img src={LogoUsuario} alt="Usuario" />
                    <h4>{dataLogged.nombreCompleto}</h4>
                </div>
                <div className='contenedor-boton-nav'>
                    <BotonesNav /> 
                </div>
                <div className='footer-nav'>
                    <BotonCerrarSesion />
                </div>
            </div>
        </nav>
    )
}

export default Nav