import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserContextProvider } from './Contexts/UserContext';

const theme = createTheme();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
