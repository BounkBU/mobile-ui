import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import tw from 'twrnc'
import { page, setPage } from '../featues/app/appSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useNavigate } from 'react-router-native'

export default function Navbar() {
  const currentPage = useAppSelector(page)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function navigateToAnotherPage(page) {
    navigate(`/${page}`)
    dispatch(setPage(page === '' ? 'home' : page))
  }

  return (
    <View
      style={tw`flex-row justify-between items-center bg-zinc-500 rounded-lg`}
    >
      <TouchableOpacity
        style={tw`flex-1 flex-row justify-center items-center py-3 rounded-l-md ${
          currentPage === 'home' ? 'bg-blue-800' : ''
        }`}
        onPress={() => navigateToAnotherPage('')}
      >
        <AntDesign name='home' size={22} color={'#f5f5f5'} />
        <Text style={tw`ml-3 text-lg font-semibold text-white`}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-1 flex-row justify-center items-center py-3 rounded-r-md ${
          currentPage === 'visualization' ? 'bg-teal-400' : ''
        }`}
        onPress={() => navigateToAnotherPage('visualization')}
      >
        <AntDesign name='linechart' size={22} color={'#f5f5f5'} s />
        <Text style={tw`ml-3 text-lg font-semibold text-white`}>
          Visualization
        </Text>
      </TouchableOpacity>
    </View>
  )
}
