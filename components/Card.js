import { View, Text } from 'react-native'
import tw from 'twrnc'

export default function Card({ item }) {
  return (
    <View
      style={tw`flex-row items-center justify-center w-32 h-32 border border-zinc-900 rounded-xl mr-4 last:mr-0`}
    >
      <Text>{item.name}</Text>
    </View>
  )
}
