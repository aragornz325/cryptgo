import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/layout/App';
import "./index.scss";
import ReduxProvider from './providers/ReduxProvider';
import { BrowserRouter } from 'react-router-dom';
import ActionsProvider from './providers/ActionsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ActionsProvider>
        <ReduxProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </ReduxProvider>
    </ActionsProvider>
);