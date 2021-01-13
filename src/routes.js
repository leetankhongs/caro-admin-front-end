import React from 'react'
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Error from "./pages/error";
import UserDetail from './pages/UserDetail';
import GameHistory from './pages/HistoryGame/index'
import Histories from './pages/Histories';

const routes = [
    {
        path: '/app/dashboard',
        exact: true,
        main: () => <Dashboard />
    },
    {
        path: '/app/users',
        exact: true,
        main: () => <Users />
    },
    {
        path: '/app/users/:id',
        exact: true,
        main: () => <UserDetail />
    },
    {
        path: '/app/histories',
        exact: true,
        main: () => <Histories />
    },
    {
        path: '/app/histories/:id',
        exact: true,
        main: () => <GameHistory />
    },
    {
        path: '',
        exact: false,
        main: () => <Error />
    },
]

export default routes;