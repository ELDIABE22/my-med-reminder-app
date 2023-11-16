import '../style/sesionRecordatorio/sesionRecordatorio.scss'
import FormRecordatorio from './FormRecordatorio'
import Nav from './Navegador/Nav'

const SesionRecordatorio = () => {
    return (
        <div className="contenedor-sesion-recordatorio">
            <Nav />
            <main>
                <h1>Agregar Recordatorio</h1>
                <div className='contenedor-main'>
                    <FormRecordatorio />
                </div>
            </main>
        </div>
    )
}

export default SesionRecordatorio