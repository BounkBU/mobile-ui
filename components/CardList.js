import { ScrollView, Text, View } from 'react-native'
import Card from './Card'
import tw from 'twrnc'

export default function CardList({
  list,
  isNearest,
  selectedRestaurant,
  setSelectedRestaurant,
  isFromMenu,
  setIsFromMenu,
}) {
  return (
    <ScrollView horizontal>
      {list.map((item, index) => (
        <View key={index} style={tw`flex-col items-center`}>
          <Card
            item={item}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            isFromMenu={isFromMenu}
            setIsFromMenu={setIsFromMenu}
          />
          {isNearest && (
            <Text style={tw`text-blue-500 mt-2`}>
              {item.distance < 0.5
                ? `${(item.distance * 1000).toFixed(2)}m`
                : `${parseFloat(item.distance).toFixed(2)}km`}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  )
}
