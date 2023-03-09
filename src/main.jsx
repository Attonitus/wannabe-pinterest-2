import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyled from './Global'
import Routing from './routing/Routing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled />
    <Routing />
  </React.StrictMode>,
)
