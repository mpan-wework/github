import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from './routes';

const Github = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Redirect from="*" to="/blob-viewer/"/>
      </Switch>
    </BrowserRouter>
  );
};

export default Github;
