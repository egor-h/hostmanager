import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'
import MenuColumn from './components/MenuColumn'
import MainView from './components/MainView'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <MainView></MainView>
    </>
  )
}

render(<App />, mainElement)
