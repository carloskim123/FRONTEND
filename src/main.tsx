import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>

)
