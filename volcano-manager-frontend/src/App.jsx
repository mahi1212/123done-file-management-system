import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './routes/routes';


function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
