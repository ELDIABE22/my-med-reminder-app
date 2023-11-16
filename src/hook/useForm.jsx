import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useForm = (initialForm = {}) => {

    const navigate = useNavigate();

    const [formRegistro, setFormRegistro] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem('usuario'));
        return storedData || initialForm
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormRegistro({
            ...formRegistro,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const generosValidos = ["hombre", "mujer", "masculino", "femenino", "no binario", "otro"];

        const usuariosExist = JSON.parse(localStorage.getItem('usuarios')) || [];
        const nuevoUsuario = { ...formRegistro };

        const verificarID = usuariosExist.find(usuario => usuario.id === nuevoUsuario.id);
        const verificarCorreo = usuariosExist.find(usuario => usuario.correo === nuevoUsuario.correo);
        const verificarTelefono = usuariosExist.find(usuario => usuario.telefono === nuevoUsuario.telefono);

        if (formRegistro.nombreCompleto && /\d/.test(formRegistro.nombreCompleto)) {
            toast.error("El nombre no debe contener números");
            return;
        }

        const nombres = formRegistro.nombreCompleto.split(" ");
        if (nombres.length < 2) {
            toast.error("Por favor, ingresa al menos un nombre y un apellido");
            return;
        }

        if (formRegistro.id && formRegistro.id.length < 5) {
            toast.error("La identificación debe tener al menos 5 números");
            return;
        }

        if (verificarID) {
            toast.error('La identificación ya esta registrada.');
            return;
        }

        if (verificarCorreo) {
            toast.error('El correo ya esta registrado')
            return;
        }

        if (formRegistro.telefono && formRegistro.telefono.length !== 10) {
            toast.error("El número de teléfono debe tener 10 dígitos");
            return;
        }

        if (verificarTelefono) {
            toast.error('El telefono ya esta registrado')
            return;
        }

        if (formRegistro.fechaNacimiento) {
            const fechaNacimiento = new Date(formRegistro.fechaNacimiento);
            const fechaHace15Anios = new Date();
            fechaHace15Anios.setFullYear(fechaHace15Anios.getFullYear() - 15);

            if (fechaNacimiento > fechaHace15Anios) {
                toast.error("Debes tener al menos 15 años para registrarte");
                return;
            }
        }

        if (formRegistro.genero && !generosValidos.includes(formRegistro.genero.toLowerCase())) {
            toast.error("Por favor, ingresa un género válido");
            return;
        }

        if (formRegistro.contraseña && formRegistro.contraseña.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        usuariosExist.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosExist));
        toast.success('Registrado exitosamente');
        setTimeout(() => {
            navigate('/agregar-recordatorio', { replace: true });
        }, "2000");
    }

    return {
        ...formRegistro,
        formRegistro,
        setFormRegistro,
        handleChange,
        handleSubmit
    };
};