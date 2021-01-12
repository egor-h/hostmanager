import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import MainView from './components/MainView'
import * as reducersRaw from './state/reducers'
import { GlobalStyle } from './styles'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const reducers = combineReducers(reducersRaw)
const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))

const App = () => {
  return (
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <MainView></MainView>
        </Router>
      </Provider>
  )
}

render(<App />, mainElement)
