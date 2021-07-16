import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { themeMain } from './configs/theme';
import store from './store';
import routes from './configs/routes';
import './App.css';
import ProtectedRoute from './components/protected_route';
import SnSAppBar from './components/Appbar';

const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <SnSAppBar>
              <Switch>
                {routes.map((route) => {
                  return route.isProtected
                  ? (<ProtectedRoute 
                    key={route.path}
                    component={route.component}
                    path={route.path}
                    exact={route.path === '/'}
                    />)
                    : (<Route 
                      key={route.path}
                      component={route.component}
                      path={route.path}
                      exact={route.path === '/'}
                      />)
                    })}
              </Switch>
            </SnSAppBar>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
