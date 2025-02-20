import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import './App.css'
import Home from './pages/Home/Home'
import './global/_core.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'
import About from './pages/About/About'

const router = createBrowserRouter([
  {
    path: '/', element: <AuthOutlet fallbackPath="login" />,
    children: [
      { path: '', element: <Home /> },
    ]
  },
  { path: 'about', element: <About /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },

])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;
