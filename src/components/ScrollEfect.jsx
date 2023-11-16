import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import '../style/styleInicio/Inicio.scss'
import '../style/styleFormRegistro/formInicioOrRegistro.scss'

// eslint-disable-next-line react/prop-types
const ScrollEfect = ({ children }) => {
    const config1 = {
        origin: 'top',
        distance: '85px',
        duration: 2000,
        reset: false,
    };

    const config2 = {
        origin: 'left',
        distance: '85px',
        duration: 3000,
        reset: false,
    };

    const config3 = {
        origin: 'right',
        distance: '85px',
        duration: 3000,
        reset: false,
    };

    useEffect(() => {
        ScrollReveal().reveal(document.querySelector('.filter'), config1);
        ScrollReveal().reveal(document.querySelector('.contenedor-registro'), config1);
        ScrollReveal().reveal(document.querySelector('.imagen-registro'), config2);
        ScrollReveal().reveal(document.querySelector('.form-registro'), config3);
    }, [config1, config2, config3]);

    return <div>{children}</div>;
}

export default ScrollEfect