import React from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import AuthContext from '../../contexts/Authentication';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, authenticated, token } = useAuthentication('usuario-test@adopets.com', '123123');

  if (loading) {
    return <div>Authenticating...</div>;
  }

  if (!authenticated) {
    return <div>Auth error!</div>;
  }

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
