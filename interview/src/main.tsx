import React, { StrictMode, useEffect, Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import { Notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';
import ErrorBoundry from './routes/ErrorBoundry';
import Layout from './routes/Layout';
import PrivateRoute from './routes/AuthRoute';
import { useAuthStore } from './store/app.store';
import AuthRoute from './routes/AuthRoute';

const LoginForm = React.lazy(() => import('./auth/LoginForm'));
const ScriptAssistInfo = React.lazy(() => import('./Features/Information/ScriptAssistInfo'));
const ResourceList = React.lazy(() => import('./Features/Resource/ResourceList'));
const ResourceDetails = React.lazy(() => import('./Features/Resource/ResourceDetails'));

const App = () => {
  const hydrate = useAuthStore((state) => state.hydrate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hydrate(); // Hydrate Zustand store on app load
  }, [hydrate]);

  // Check if hydration has been completed
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      setLoading(false); // Stop loading once the store is hydrated
    }
  }, [hasHydrated]);

  if (loading) {
    return <div>Loading...</div> // Show loading until store is hydrated
  }

  const routes = [
    {
      path: '/',
      element: <AuthRoute isPrivate={false}><LoginForm /></AuthRoute>,
      errorElement: <ErrorBoundry />
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <AuthRoute><Layout /></AuthRoute>
        </PrivateRoute>
      ),
      children: [
        {
          path: 'info',
          element: (
            <Suspense fallback={<div className='loader-style'><Loader size={20} /></div>}>
              <ScriptAssistInfo />
            </Suspense>
          ),
        },
        {
          path: 'resource-list',
          element: (
            <Suspense fallback={<div className='loader-style'><Loader size={20} /></div>}>
              <ResourceList />
            </Suspense>
          ),
        },
        {
          path: 'resource/:id',
          element: (
            <Suspense fallback={<div className='loader-style'><Loader size={20} /></div>}>
              <ResourceDetails />
            </Suspense>
          )
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 1000 * 60 * 15,
      },
    },
  });

  return (
    <StrictMode>
      <Notifications position="top-right" zIndex={9999} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
