// import { Color, Titlebar } from 'custom-electron-titlebar'
import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import MainView from './components/MainView'
import * as reducersRaw from './state/reducers'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const reducers = combineReducers(reducersRaw)
const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))

// window.addEventListener('DOMContentLoaded', () => {
//   const titlebar = new Titlebar({
//     backgroundColor: Color.fromHex('#F5F5F5')
//   })
//   titlebar.updateTitle('HostsManager app is to manage hosts!')
// })

const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <MainView></MainView>
        </Router>
      </Provider>
  )
}

connect((state) => {
  console.log(state);
  return state
})(App);

render(<App />, mainElement)
