import { Route, Routes } from 'react-router-native'
import { Home, Visualization } from './pages'
import Information from './pages/Information'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/info' element={<Information />} />
      <Route path='/visualization' element={<Visualization />} />
    </Routes>
  )
}
