import { createContext } from 'react';

export interface AuthenticationState {
  token: string;
}

const INITIAL_STATE: AuthenticationState = {
  token: '',
};

export default createContext<AuthenticationState>(INITIAL_STATE);
