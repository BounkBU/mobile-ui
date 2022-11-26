import { Route, Routes } from 'react-router-native'
import { Home } from './pages'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
