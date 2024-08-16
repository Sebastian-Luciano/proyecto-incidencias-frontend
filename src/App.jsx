import React from 'react';
import { Route, Switch } from 'wouter';
import { useAuth } from './hooks/useAuth';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin-dashboard">
          {user && user.isAdmin ? <AdminDashboard /> : <Login />}
        </Route>
        <Route path="/user-dashboard">
          {user && !user.isAdmin ? <UserDashboard /> : <Login />}
        </Route>
      </Switch>
    </div>
    </ErrorBoundary>
  )
}