import { useEffect, useState } from 'react';
import '../style/sesionRecordatorio/cardRecordatorio.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import alarma from '../assets/alarma.png'
import tonoAlerta from '../assets/alerta-nextel-ringtones.mp3';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const CardRecordatorio = ({ recordatorio, handleDelete, handleUpdate, handleUpdateSuministro, mensajePendiente }) => {
    const { medicamento, cantidad, cantidadMedicamento, sms, time, nota } = recordatorio;

    const [tiempoRestanteMensaje, setTiempoRestanteMensaje] = useState('');
    const [alertaMostrada, setAlertaMostrada] = useState(false);
    const [actualizarCard, setActualizarCard] = useState(false)

    const handleChangeUpdate = (e) => {
        handleUpdate(recordatorio, e.target.name, e.target.value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const mostrarTiempoRestante = () => {
        const tono = new Audio(tonoAlerta);

        let date = new Date();
        let hora = date.getHours();
        let minutos = date.getMinutes();
        // let segundos = date.getSeconds();
        // let ampm = hora >= 12 ? 'PM' : 'AM';

        hora = hora == 0 ? hora = 12 : hora;
        hora = hora < 10 ? '0' + hora : hora;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        // segundos = segundos < 10 ? '0' + segundos : segundos;

        let [horaObjetivo, minutosObjetivo] = time.split(':');

        horaObjetivo = parseInt(horaObjetivo, 10);
        minutosObjetivo = parseInt(minutosObjetivo, 10);

        let horasRestantes = horaObjetivo - hora;
        let minutosRestantes = minutosObjetivo - minutos;

        if (horasRestantes < 0) {
            horasRestantes += 24;
        }
        if (minutosRestantes < 0) {
            minutosRestantes += 60;
            horasRestantes -= 1;

            if (horasRestantes < 0) {
                horasRestantes += 24;
            }
        }

        let mensaje = '';

        if (horasRestantes === 0 && minutosRestantes === 0 && alertaMostrada == false) {
            tono.play();
            tono.loop = true;
            mostrarAlerta(tono);
            setAlertaMostrada(true);
        } else if (horasRestantes === 0 && minutosRestantes === 0) {
            mensaje = `Hora del medicamento!`;
        } else if (horasRestantes === 0 && minutosRestantes === 1) {
            mensaje = `${minutosRestantes} minuto`;
        } else if (horasRestantes === 0 && minutosRestantes > 0) {
            mensaje = `${minutosRestantes} minutos`;
        } else if (horasRestantes === 1 && minutosRestantes === 0) {
            mensaje = `${horasRestantes} hora`;
        } else if (horasRestantes > 0 && minutosRestantes === 0) {
            mensaje = `${horasRestantes} horas`;
        } else if (horasRestantes > 0 && minutosRestantes > 0) {
            mensaje = `${horasRestantes} horas y ${minutosRestantes} minutos`;
            setAlertaMostrada(false);
        }

        setTiempoRestanteMensaje(mensaje);

        return { horasRestantes, minutosRestantes }
    };

    const mostrarAlerta = (tono) => {
        Swal.fire({
            imageUrl: alarma,
            imageWidth: 500,
            imageHeight: 300,
            title: 'Hora del medicamento!',
            text: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Listo',
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateSuministro(recordatorio);
                tono.pause();
            } else {
                handleUpdateSuministro(recordatorio);
                tono.pause();
            }
        });
    };

    useEffect(() => {
        let alarma;

        const handleInterval = () => {
            mostrarTiempoRestante();
        };

        alarma = setInterval(handleInterval, 1000);

        return () => clearInterval(alarma);
    }, [mostrarTiempoRestante]);

    return (
        <div className="plan">
            <div className="inner">
                <span className="pricing">
                    Alarma:
                    <span>
                        <small>{tiempoRestanteMensaje}</small>
                    </span>
                </span>
                <p className="title"> {actualizarCard ? (<input className='input' type="text" placeholder='Titulo' name='medicamento' value={medicamento} onChange={handleChangeUpdate} />) : medicamento} </p>
                <ul className="features">
                    <li>
                        <span className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span><strong>Receta:</strong> {actualizarCard ? (<input className='input' type="text" placeholder='Receta' name='cantidad' value={cantidad} onChange={handleChangeUpdate} />) : cantidad}</span>
                    </li>
                    <li>
                        <span className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span><strong>Suministro:</strong>
                            {mensajePendiente ? ' Pendiente...' : actualizarCard ? (<input className='input' type="number" min='1' max='100' placeholder='Suminitro' name='cantidadMedicamento' value={cantidadMedicamento} onChange={handleChangeUpdate} />) : cantidadMedicamento}
                        </span>
                    </li>
                    <li>
                        <span className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span><strong>SMS:</strong> {actualizarCard ? (<input className='input' type="number" placeholder='SMS' name='sms' value={sms} onChange={handleChangeUpdate} />) : sms}</span>
                    </li>
                    <li>
                        <span className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span><strong>Hora del Recordatorio:</strong> {actualizarCard ? (<input className='input' type="time" name='time' value={time} onChange={handleChangeUpdate} />) : time} </span>
                    </li>
                </ul>
                <p className="info"><strong>Nota:</strong> {actualizarCard ? (<textarea className='mi-textarea textareaEdit' type="text" name='nota' value={nota} onChange={handleChangeUpdate} />) : nota ? nota : 'Sin nota.'} </p>
                {actualizarCard ? (
                    <div className="action">
                        <button className="btn-card-recordatorio"
                            onClick={() => {
                                if (actualizarCard) {
                                    setActualizarCard(false);
                                }
                            }}>
                            <p className="paragraph"> Listo </p>
                            <span className="icon-wrapper">
                                <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="action">
                        <button className="btn-card-recordatorio"
                            onClick={() => {
                                setActualizarCard(true);
                            }}>
                            <p className="paragraph"> Editar </p>
                            <span className="icon-wrapper">
                                <svg className="icon" width="30px" height="30px" viewBox="0 0 512 512">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                </svg>
                            </span>
                        </button>
                        <button className="btn-card-recordatorio" onClick={() => handleDelete(recordatorio)}>
                            <p className="paragraph"> Eliminar </p>
                            <span className="icon-wrapper">
                                <svg className="icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

CardRecordatorio.propTypes = {
    recordatorio: PropTypes.shape({
        medicamento: PropTypes.string.isRequired,
        cantidad: PropTypes.string.isRequired,
        cantidadMedicamento: PropTypes.string.isRequired,
        sms: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        nota: PropTypes.string.isRequired,
    }).isRequired,
};

export default CardRecordatorio