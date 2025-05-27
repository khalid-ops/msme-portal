import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/notfound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 404 - catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
