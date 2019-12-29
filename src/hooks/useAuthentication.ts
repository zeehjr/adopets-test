import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const sessionRequest = async () => {
  const data = {
    system_api_key: API_KEY,
  };

  try {
    const res = await axios.post('https://test.adopets.app/v1/auth/session-request', data);

    return res.data.data.access_key;
  } catch {
    return null;
  }
};

const sessionRegister = async (email: string, password: string, token: string) => {
  const data = {
    organization_user: {
      email,
      password,
    },
  };

  try {
    const res = await axios.post('https://test.adopets.app/v1/auth/session-register', data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data.data.access_key;
  } catch {
    return null;
  }
};

const useAuthentication = (email: string, password: string) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const authFailedAction = useCallback(() => {
    setToken('');
    setAuthenticated(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      const storedToken = sessionStorage.getItem('token');

      if (storedToken != null) {
        setToken(storedToken);
        setAuthenticated(true);
        setLoading(false);
        axios.defaults.headers.authorization = `Bearer ${storedToken}`;
        return;
      }

      const requestToken = await sessionRequest();

      if (!requestToken) {
        authFailedAction();
        return;
      }

      const newToken = await sessionRegister(email, password, requestToken);

      if (newToken) {
        setToken(newToken);
        setAuthenticated(true);
        setLoading(false);
        sessionStorage.setItem('token', newToken);
        axios.defaults.headers.authorization = `Bearer ${newToken}`;
        return;
      }

      authFailedAction();
    })();
  }, [email, password, authFailedAction]);

  return {
    token,
    authenticated,
    loading,
  };
};

export default useAuthentication;
