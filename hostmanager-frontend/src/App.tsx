import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'
import MenuColumn from './components/MenuColumn'
import MainView from './components/MainView'
import { BrowserRouter as Router } from 'react-router-dom';

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <Router>
        <MainView></MainView>
      </Router>
      
    </>
  )
}

render(<App />, mainElement)
