import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Greetings from './components/Greetings';
import MenuColumn from './components/MenuColumn';
import MainView from './components/MainView';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import * as reducersRaw from './state/reducers';
import { local } from './state/actions'

import { Titlebar, Color } from 'custom-electron-titlebar';

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const reducers = combineReducers(reducersRaw);
const store = createStore(reducers);



window.addEventListener('DOMContentLoaded', () => {
    let titlebar = new Titlebar({
        backgroundColor: Color.fromHex("#F5F5F5")
    });
    titlebar.updateTitle("HostsManager app is to manage hosts!");
});

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
