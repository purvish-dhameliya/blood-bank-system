import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donor from './pages/Dashboard/Donor';
import Hospital from './pages/Dashboard/Hospital';
import Organization from './pages/Dashboard/Organization';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Dashboard/Donation';
import Analytics from './pages/Dashboard/Analytics';
import OrgList from './pages/Admin/OrgList';
import HospitalList from './pages/Admin/HospitalList';
import DonateList from './pages/Admin/DonateList';
import AdminHome from './pages/Admin/AdminHome';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>}
        />

        <Route path='/donor' element={<ProtectedRoute>
          <Donor />
        </ProtectedRoute>}
        />
        <Route path='/hospital' element={<ProtectedRoute>
          <Hospital />
        </ProtectedRoute>}
        />

        <Route path='/organization' element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        } />

        <Route path='/consumer' element={
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>
        } />

        <Route path='/donation' element={
          <ProtectedRoute>
            <Donation />
          </ProtectedRoute>
        } />

        <Route path='/analytics' element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        } />
        <Route path='/donor-list' element={
          <ProtectedRoute>
            <DonateList />
          </ProtectedRoute>
        } />
        <Route path='/hospital-list' element={
          <ProtectedRoute>
            <HospitalList />
          </ProtectedRoute>
        } />

        <Route path='/org-list' element={
          <ProtectedRoute>
            <OrgList />
          </ProtectedRoute>
        } />

        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
      </Routes>

    </div>
  );
}

export default App;
