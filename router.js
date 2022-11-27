import { Route, Routes } from 'react-router-native'
import { Home, Visualization } from './pages'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/visualization' element={<Visualization />} />
    </Routes>
  )
}
