import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '../src/styles/globol.css'
import { BrowserRouter } from "react-router-dom"
import SideNavBar from './components/SideNavBar/SideNavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <SideNavBar />
  </BrowserRouter>,
)