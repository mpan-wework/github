import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from './routes';

const Github = () => {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Redirect from="*" to="/blob-viewer/" />
      </Switch>
    </HashRouter>
  );
};

export default Github;
