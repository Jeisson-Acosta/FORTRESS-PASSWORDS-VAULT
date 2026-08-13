import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResponseDBProvider } from './context/responseDB.jsx'
import { UserLoginProvider } from './context/userLogin.jsx'

createRoot(document.getElementById('root')).render(
  <ResponseDBProvider>
    <UserLoginProvider>
      <App />
    </UserLoginProvider>
  </ResponseDBProvider>,
)
