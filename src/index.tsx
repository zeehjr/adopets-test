import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotenvConfig } from 'dotenv';
import App from './App';

dotenvConfig();

ReactDOM.render(<App />, document.getElementById('root'));
