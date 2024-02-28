import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { VisibilityProvider } from './providers/VisiblityProvider.tsx';
import { isEnvBrowser } from './utils/misc.ts';
const root = document.getElementById('root');

if (isEnvBrowser()) {
  // https://i.imgur.com/iPTAdYV.png - Night time img
  // https://i.imgur.com/3pzRj9n.png - Morning time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <VisibilityProvider>
      <App />
    </VisibilityProvider>
  </React.StrictMode>,
)