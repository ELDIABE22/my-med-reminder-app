import { toast } from 'react-toastify';
import '../style/sesionRecordatorio/sesionVerRecordatorio.scss'
import CardRecordatorio from "./CardRecordatorio"
import Nav from "./Navegador/Nav"
import { useState } from 'react';

const SesionVerRecordatorio = () => {
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem('Sesion Iniciada')));

    const [mensajePendiente, setMensajePendiente] = useState(false);

    const handleDelete = (recordatorioEliminar) => {
        const nuevosRecordatorios = dataUser.recordatorio.filter(recordatorio => JSON.stringify(recordatorio) !== JSON.stringify(recordatorioEliminar));

        const localStorageData = JSON.parse(localStorage.getItem('Sesion Iniciada'));

        localStorageData.recordatorio = nuevosRecordatorios;
        localStorage.setItem('Sesion Iniciada', JSON.stringify(localStorageData));

        const usuarios = JSON.parse(localStorage.getItem('usuarios'));

        const usuarioActual = usuarios.find(usuario => usuario.id === dataUser.id);

        if (usuarioActual) {
            usuarioActual.recordatorio = nuevosRecordatorios;

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        setDataUser(prevState => ({
            ...prevState,
            recordatorio: nuevosRecordatorios
        }));

        toast.warning('Recordatorio eliminado.');
    };

    const handleUpdate = (cardRecordatorio, propiedad, valor) => {
        const recordatorioCondicion = dataUser.recordatorio.find(recordatorio => JSON.stringify(recordatorio) === JSON.stringify(cardRecordatorio));

        if (recordatorioCondicion && propiedad !== undefined && valor !== undefined) {
            if (propiedad === "medicamento" && /\d/.test(valor)) {
                toast.error("El medicamento no debe contener números");
                return;
            }

            recordatorioCondicion[propiedad] = valor !== '' ? valor : recordatorioCondicion[propiedad];
        }

        setDataUser(prevState => {
            const nuevosRecordatorios = prevState.recordatorio.map(r => {
                return JSON.stringify(r) === JSON.stringify(recordatorioCondicion) ? { ...r, [propiedad]: valor } : r;
            });

            const usuarios = JSON.parse(localStorage.getItem('usuarios'));
            const usuarioActual = usuarios.find(usuario => usuario.id === dataUser.id);
            usuarioActual.recordatorio = nuevosRecordatorios;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            const localStorageData = JSON.parse(localStorage.getItem('Sesion Iniciada'));
            localStorageData.recordatorio = nuevosRecordatorios;
            localStorage.setItem('Sesion Iniciada', JSON.stringify(localStorageData));

            return {
                ...prevState,
                recordatorio: nuevosRecordatorios,
            };
        });
    };

    const handleUpdateSuministro = (recordatorioInfo) => {
        setDataUser(prevState => {
            const nuevosRecordatorios = prevState.recordatorio.map((r) => {
                if (JSON.stringify(r) === JSON.stringify(recordatorioInfo)) {
                    let nuevaCantidad = parseInt(r.cantidadMedicamento, 10) - 1;

                    if (nuevaCantidad <= 0) {
                        setMensajePendiente(true);

                        setTimeout(() => {
                            setMensajePendiente(false);
                            setDataUser(prevState => ({
                                ...prevState,
                                recordatorio: prevState.recordatorio.map(rec => {
                                    if (JSON.stringify(rec) === JSON.stringify(recordatorioInfo)) {
                                        rec.cantidadMedicamento = (parseInt(rec.cantidadMedicamento, 10) + 10).toString();
                                    }
                                    return rec;
                                })
                            }));
                        }, 3000);
                    } else {
                        r.cantidadMedicamento = nuevaCantidad.toString();
                    }
                }
                return r;
            });

            const usuarios = JSON.parse(localStorage.getItem('usuarios'));
            const usuarioActual = usuarios.find(usuario => usuario.id === dataUser.id);
            usuarioActual.recordatorio = nuevosRecordatorios;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            const localStorageData = JSON.parse(localStorage.getItem('Sesion Iniciada'));
            localStorageData.recordatorio = nuevosRecordatorios;
            localStorage.setItem('Sesion Iniciada', JSON.stringify(localStorageData));

            return {
                ...prevState,
                recordatorio: nuevosRecordatorios,
            };
        });
    }

    return (
        <div className="contenedor-sesion-ver-recordatorio">
            <Nav />
            <main>
                <h1>Historial de Recordatorios</h1>
                <div className='contenedor-main-ver-recordatorio'>
                    {dataUser.recordatorio && dataUser.recordatorio.length > 0 ? (
                        dataUser.recordatorio.map((recordatorio, index) => (
                            <CardRecordatorio
                                key={index}
                                recordatorio={recordatorio}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                handleUpdateSuministro={handleUpdateSuministro}
                                mensajePendiente={mensajePendiente}
                            />
                        ))
                    ) : (
                        <h3 className='no-recordatorio'>No hay recordatorios.</h3>
                    )}
                </div>
            </main>
        </div>
    )
}

export default SesionVerRecordatorio