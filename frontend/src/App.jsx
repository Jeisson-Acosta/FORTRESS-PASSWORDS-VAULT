import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// ======== PAGES =========
import { LoginForm } from './pages/auth/LoginForm.jsx'
import { Vault } from './pages/auth/Vault.jsx'

// ======= COMPONENTS =======
import { Layout } from './components/Layout.jsx'

function App() {

  return (
    <Router>      
      <Toaster />
      <Routes>
        <Route index path='/' element={<LoginForm />}  />
        <Route element={<Layout />}>
          <Route path='/boveda' element={<Vault />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
