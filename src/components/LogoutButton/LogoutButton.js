import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Otras acciones de cierre de sesión, como redireccionar al usuario a la página de inicio de sesión, etc.
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
}

export default LogoutButton;
