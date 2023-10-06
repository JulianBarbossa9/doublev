import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage.jsx';
import UserDetail from './components/UserDetail.jsx';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import UsersSelect from './components/UsersSelect.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "user/:login",
    element: <UserDetail />,
  },
  {
    path: "user/selected",
    element: <UsersSelect />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
     <ToastContainer position="bottom-right" />
  </React.StrictMode>,
)
