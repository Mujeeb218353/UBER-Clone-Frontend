import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, StrictMode, Suspense } from "react";
import GlobalProvider from "./context/GlobalContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Loader from "./components/Loader.jsx";
import NotFound from "./components/NotFound.jsx";
import "remixicon/fonts/remixicon.css";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));

const UsersLayout = lazy(() => import("./Layouts/UsersLayout.jsx"));
const UsersPage = lazy(() => import("./pages/UsersPage.jsx"));
const UserSignUp = lazy(() => import("./pages/UserSignUp.jsx"));

const CaptainsLayout = lazy(() => import("./Layouts/CaptainsLayout.jsx"));
const CaptainsPage = lazy(() => import("./pages/CaptainsPage.jsx"));
const CaptainSignUp = lazy(() => import("./pages/CaptainSignUp.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot_pass",
        element: <ForgotPassword />
      }
    ],
  },
  {
    path: "users",
    element: <UsersLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: <UserSignUp />,
      },
    ],
  },
  {
    path: "captains",
    element: <CaptainsLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <CaptainsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: <CaptainSignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
    </GlobalProvider>
  </StrictMode>
);
