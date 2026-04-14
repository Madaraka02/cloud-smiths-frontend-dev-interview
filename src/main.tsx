import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner.tsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        richColors
       />
    </QueryClientProvider>
  </BrowserRouter>,
  </StrictMode>,
)
