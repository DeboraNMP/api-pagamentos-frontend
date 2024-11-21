import './global.css'
import { Route, Routes } from "react-router-dom";
import { UserRegistration } from "./pages/userRegistration";
import { LoginUser } from './pages/Login';
import { Home } from './pages/Home';
import { TableClientsList } from './components/TableClientsList';
import { ClientDetails } from './pages/ClientDetails';
import { TableCharges } from './pages/TableCharges';
import { PublicRoutes } from './routes/publicRoutes';
import { ProtectedRoutes } from './routes/protectedRoutes';

function App() {

  return (
    <Routes>
      <Route path="/signup" element={<PublicRoutes children={<UserRegistration />} redirectTo='/home' />} />
      <Route path="/login" element={<PublicRoutes children={<LoginUser />} redirectTo='/home' />} />
      <Route path="/home" element={<ProtectedRoutes children={<Home />} redirectTo='/login' />} />
      <Route path="/clients" element={<ProtectedRoutes children={<TableClientsList />} redirectTo='/login' />} />
      <Route path="/clientDetails/:id" element={<ProtectedRoutes children={<ClientDetails />} redirectTo='/login' />} />
      <Route path="/charge" element={<ProtectedRoutes children={<TableCharges />} redirectTo='/login' />} />
    </Routes>

  )
}

export default App

