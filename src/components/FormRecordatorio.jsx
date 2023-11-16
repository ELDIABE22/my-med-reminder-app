import { useState } from 'react';
import '../style/sesionRecordatorio/formRecordatorio.scss'
import { toast } from 'react-toastify';

const FormRecordatorio = () => {
    const [newRecordatorio, setNewRecordatorio] = useState({
        medicamento: '',
        cantidad: '',
        cantidadMedicamento: '',
        sms: '',
        time: '',
        nota: ''
    });

    const [nota, setNota] = useState(false);

    const ActiveNota = () => {
        setNota(!nota)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecordatorio({
            ...newRecordatorio,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const dataUser = JSON.parse(localStorage.getItem('Sesion Iniciada'));
        const usuarioActual = usuarios.find(usuario => usuario.id === dataUser.id);

        if (newRecordatorio.medicamento && /\d/.test(newRecordatorio.medicamento)) {
            toast.error("El medicamento no debe contener números");
            return;
        }

        if (newRecordatorio.sms && newRecordatorio.sms.length !== 10) {
            toast.error("El número de teléfono debe tener 10 dígitos");
            return;
        }

        const nuevoRecordatorio = {
            medicamento: newRecordatorio.medicamento,
            cantidad: newRecordatorio.cantidad,
            cantidadMedicamento: newRecordatorio.cantidadMedicamento,
            sms: newRecordatorio.sms,
            time: newRecordatorio.time,
            nota: newRecordatorio.nota
        };

        usuarioActual.recordatorio.push(nuevoRecordatorio);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        localStorage.setItem('Sesion Iniciada', JSON.stringify(usuarioActual));

        setNewRecordatorio({
            medicamento: '',
            cantidad: '',
            cantidadMedicamento: '',
            sms: '',
            time: '',
            nota: ''
        });

        toast.success('Recordatorio agregado correctamente.')
    }

    return (
        <div className="container">
            <div className="heading">Recordatorio </div>
            <form className="form" onSubmit={handleSubmit}>
                <input required className="input" type="text" value={newRecordatorio.medicamento} onChange={(handleChange)} name="medicamento" id="medicamento" placeholder="Medicamento (Ej. Dolex, etc.)" />
                <input required className="input" type="text" value={newRecordatorio.cantidad} onChange={handleChange} name="cantidad" id="cantidad" placeholder="Cantidad Receta (Ej. 1 pastilla, 2, etc.)" />
                <input required className="input" type="number" value={newRecordatorio.cantidadMedicamento} onChange={handleChange} name="cantidadMedicamento" min='1' max='100' id="cantidad-medicamento" placeholder="Suministro del Medicamento (Ej. 50)" />
                <input required className="input" type="number" value={newRecordatorio.sms} onChange={handleChange} name="sms" min='1' id="sms" placeholder="Recordatorio por SMS (N. telefono)" />
                <label htmlFor="time">
                    <span>Hora del Recordatorio:</span>
                    <input required className="input" type="time" value={newRecordatorio.time} onChange={handleChange} name="time" id="time" />
                </label>
                {nota ? (<textarea className="input mi-textarea" type="text" value={newRecordatorio.nota} onChange={handleChange} name="nota" id="nota" placeholder="Nota" />)
                    : (<input className="login-button" type="button" value="Agregar Nota" onClick={ActiveNota} />
                    )}
                <input className="login-button" type="submit" value="Agregar Recordatorio" />
            </form>
        </div>
    )
}

export default FormRecordatorio