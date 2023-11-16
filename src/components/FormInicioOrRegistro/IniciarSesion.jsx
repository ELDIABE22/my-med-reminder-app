import ImgRecordatorio from '../../assets/recordatorio.png'
import ScrollEfect from '../ScrollEfect';
import FormIniciarSesion from './FormIniciarSesion';
import InicioEfect from '../InicioEfect';

const IniciarSesion = () => {
    return (
        <div className='contenedor'>
            <ScrollEfect>
                <div className='contenedor-registro'>
                    <div className='imagen-registro'>
                        <img src={ImgRecordatorio} alt="recordatorio" />
                    </div>
                    <div className='form-registro'>
                        <FormIniciarSesion  /> 
                    </div>
                </div>
            </ScrollEfect>
            <InicioEfect />
        </div>
    )
}

export default IniciarSesion