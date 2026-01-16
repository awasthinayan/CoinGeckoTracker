import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';
import Common from './CommonSlide/Common_Anime.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Common>
      <StrictMode>
        <App />
      </StrictMode>
      </Common>
    </QueryClientProvider>
  </BrowserRouter>
)
