import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center items-center space-x-8 my-8">
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="h-24 w-24" alt="loveUfestival logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 w-24" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center text-blue-600">loveUfestival</h1>
      <div className="card bg-gray-100 p-6 rounded-lg shadow-md text-center mt-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-200 px-1 py-0.5 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center text-gray-500 mt-6">
        Click on the Vite and React logos to learn more
      </p>
      <div className="flex justify-center mt-8">
        <PWABadge />
      </div>
    </>
  )
}

export default App
