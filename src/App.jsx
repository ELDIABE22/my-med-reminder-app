import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Inicio from './components/Inicio'
import SesionRecordatorio from './components/SesionRecordatorio'
import IniciarSesion from './components/FormInicioOrRegistro/IniciarSesion'
import Registrar from './components/FormInicioOrRegistro/Registrar'
import SesionVerRecordatorio from './components/SesionVerRecordatorio'
import ProtectedRoute from './Router/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/iniciar-sesion' element={<IniciarSesion />} />
        <Route path='/registrar-usuario' element={<Registrar />} />
        <Route element={<ProtectedRoute />}>
          <Route path='agregar-recordatorio' element={<SesionRecordatorio />} />
          <Route path='ver-recordatorios' element={<SesionVerRecordatorio />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </BrowserRouter>
  )
}

export default App
