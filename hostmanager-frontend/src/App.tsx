import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'
import MenuColumn from './components/MenuColumn'
import MainView from './components/MainView'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const reducers = combineReducers({})
const store = createStore(reducers)

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <MainView></MainView>
        </Router>
      </Provider>
    </>
  )
}

render(<App />, mainElement)
