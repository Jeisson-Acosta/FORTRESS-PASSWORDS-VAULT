import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ======== PAGES =========
import { LoginForm } from './pages/auth/LoginForm.jsx'

function App() {

  return (
    <Router>      
      <Routes>
        <Route index path='/' element={<LoginForm />}  />
      </Routes>
    </Router>
  )
}

export default App
