import { Provider } from 'react-redux'
import { NativeRouter } from 'react-router-native'
import Router from './router'
import { store } from './app/store'

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Router />
      </NativeRouter>
    </Provider>
  )
}
