import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, StrictMode, Suspense } from "react";
import 'remixicon/fonts/remixicon.css'
import AppContext from "./context/AppContext.jsx";
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Loader from "./components/Loader.jsx";
import NotFound from './components/NotFound.jsx';
import './index.css'
import App from './App.jsx'

const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      }
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>
      <ErrorBoundary>
      <RouterProvider router={router} />
      </ErrorBoundary>
    </AppContext>
  </StrictMode>,
)
