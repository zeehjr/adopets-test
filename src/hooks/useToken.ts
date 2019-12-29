import { useContext } from 'react';
import Authentication from '../contexts/Authentication';

export default () => {
  const { token } = useContext(Authentication);

  return token;
};
