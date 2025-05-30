import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StateContextProvider } from './contexts/StateContext'
import { initialState } from './contexts/reducer'
import reducer from './contexts/reducer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContextProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateContextProvider>
  </StrictMode>,
)
