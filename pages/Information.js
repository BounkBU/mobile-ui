import { View, Image, Text, SafeAreaView, ScrollView } from 'react-native'
import { CardList } from '../components'
import tw from 'twrnc'

export default function Information() {
  const mock = [
    {
      id: 1,
      name: 'Test 1',
    },
    {
      id: 2,
      name: 'Test 2',
    },
    {
      id: 3,
      name: 'Test 3',
    },
    {
      id: 4,
      name: 'Test 4',
    },
  ]

  return (
    <SafeAreaView style={tw`h-full relative mx-3`}>
      <ScrollView>
        <View style={tw`w-32 h-32 mx-auto`}>
          <Image
            style={tw`w-full h-full object-cover`}
            source={require('../assets/kurester.png')}
          />
        </View>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-xl font-bold mb-4`}>Recommended Menu</Text>
          <View style={tw`bg-red-500 w-full max-h-60`}>
            <Image
              source={require('../assets/adaptive-icon.png')}
              style={tw`w-full h-full object-contain`}
            />
          </View>
          <Text style={tw`mt-4`}>Name: Curry Rice</Text>
          <Text>From: Tokidoki Kaset-Phaholyothin</Text>
        </View>
        <View style={tw`flex-col mt-8`}>
          <Text style={tw`font-semibold text-xl mb-3`}>
            Nearest Restaurants
          </Text>
          <CardList list={mock} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
