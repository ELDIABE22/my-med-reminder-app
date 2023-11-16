import '../../style/nav/botonesNav.scss'
import ImgUserAgregar from '../../assets/agregar-recordatorio.png'
import ImgVerAgregar from '../../assets/ver-recordatorio.png'
import { BotonNav } from './BotonNav'

const BotonesNav = () => {
    const imgBotones = [
        {id: 1, img: ImgUserAgregar, alt: 'userAgregar', enlace: '/agregar-recordatorio'},
        {id: 2, img: ImgVerAgregar, alt: 'verAgregar', enlace: '/ver-recordatorios'}
    ];

    return (
        <>
            {imgBotones.map((imagen) => (
                <BotonNav key={imagen.id} img={imagen.img} alt={imagen.alt} enlace={imagen.enlace} />
            ))}
        </>
    )
}

export default BotonesNav