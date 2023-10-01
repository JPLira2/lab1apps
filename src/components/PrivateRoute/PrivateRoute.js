import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Aquí debes implementar la lógica de autenticación
  // Puedes verificar si el usuario está autenticado, por ejemplo, comprobando la existencia de un token en el almacenamiento local
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
