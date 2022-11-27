import { Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

export default function Card({
  item,
  selectedRestaurant,
  setSelectedRestaurant,
  isFromMenu,
  setIsFromMenu,
}) {
  function onClickHandler(id) {
    setIsFromMenu(false)
    setSelectedRestaurant(id)
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-center w-32 h-32 border border-zinc-900 rounded-xl mr-4 last:mr-0 border-2 ${
        !isFromMenu && selectedRestaurant === item.id ? 'border-blue-700' : ''
      }`}
      onPress={() => onClickHandler(item.id)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )
}
