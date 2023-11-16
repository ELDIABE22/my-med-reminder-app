import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const BotonNav = ({ img, alt, enlace }) => {
    return (
        <Link to={enlace}>
            <div className="boton-nav">
                <div className='contenedor-boton'>
                    <img src={img} alt={alt} />
                </div>
            </div>
        </Link>
    )
}
