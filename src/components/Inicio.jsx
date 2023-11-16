import '../style/styleInicio/Inicio.scss'
import { Link } from 'react-router-dom'
import ScrollEfect from './ScrollEfect';
import InicioEfect from './InicioEfect';

const Inicio = () => {
    return (
        <div className='contenedor'>
            <div className='contenedor-texto'>
                <ScrollEfect >
                    <div className='filter'>
                        <h1>Bienvenido a RemediCare: <span>Tu Compañero Personal de Salud</span></h1>
                        <div className="descripcion">
                            <p>RemediCare te ayuda a nunca perder una dosis.</p>
                            <p>Organiza tus medicamentos, establece recordatorios personalizados y cuida de tu salud de manera sencilla.</p>
                            <p>¡Simplifica tu rutina diaria de medicación con RemediCare!</p>
                        </div>
                        <Link to='/iniciar-sesion'>
                            <button className="learn-more">
                                <span className="circle-button" aria-hidden="true">
                                    <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Comienza</span>
                            </button>
                        </Link>
                    </div>
                </ScrollEfect>
            </div>
            <InicioEfect />
        </div>
    );
};

export default Inicio;
