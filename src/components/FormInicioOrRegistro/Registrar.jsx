import ImgRecordatorio from '../../assets/recordatorio.png'
import ScrollEfect from '../ScrollEfect';
import FormRegistrar from './FormRegistrar';
import InicioEfect from '../InicioEfect';

const Registrar = () => {
    return (
        <div className='contenedor'>
            <ScrollEfect>
                <div className='contenedor-registro'>
                    <div className='imagen-registro'>
                        <img src={ImgRecordatorio} alt="recordatorio" />
                    </div>
                    <div className='form-registro'>
                        <FormRegistrar />
                    </div>
                </div>
            </ScrollEfect>
            <InicioEfect />
        </div>
    )
}

export default Registrar