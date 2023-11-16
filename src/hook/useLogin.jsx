import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = (initialLogin = {}) => {

    const navigate = useNavigate();

    const [formIniciar, setFormIniciar] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem('usuario'));
        return storedData || initialLogin
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormIniciar({
            ...formIniciar,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuariosExist = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuariosExist.find(
            (usuario) => usuario.id === formIniciar.id && usuario.contraseña === formIniciar.contraseña
        );

        if (formIniciar.id && formIniciar.id.length < 5) {
            toast.error("La identificación debe tener al menos 5 números");
            return;
        }

        if (formIniciar.contraseña && formIniciar.contraseña.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (usuarioEncontrado) {
            toast.success('Inicio de sesión exitoso');
            setTimeout(() => {
                localStorage.setItem('Sesion Iniciada', JSON.stringify(usuarioEncontrado));
                navigate('/agregar-recordatorio', { replace: true });
            }, "1500");
        } else {
            toast.error('Datos incorrectos. Verifica tu ID y contraseña.');
        }
    };

    return {
        ...formIniciar,
        formIniciar,
        handleChange,
        handleSubmit
    }
}

export default useLogin