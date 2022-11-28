import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { CardList } from '../components'
import tw from 'twrnc'
import { useState } from 'react'
import client from '../client'

export default function Information({
  recommendedMenu,
  nearestRestaurants,
  setIsSubmittedForm,
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [isFromMenu, setIsFromMenu] = useState(false)

  async function onSubmitHandler() {
    if (!selectedRestaurant) return
    client
      .post(`/restaurants/popularity/${selectedRestaurant}`, JSON.stringify({}))
      .then((response) => {
        setIsSubmittedForm(false)
      })
  }

  function onClickHandler() {
    setIsFromMenu(true)
    setSelectedRestaurant(recommendedMenu.restaurant.id)
  }

  return (
    <SafeAreaView style={tw`h-full relative mx-3`}>
      <ScrollView>
        <View style={tw`w-32 h-32 mx-auto`}>
          <Image
            style={tw`w-full h-full self-center`}
            resizeMode={'cover'}
            source={require('../assets/kurester.png')}
          />
        </View>
        {recommendedMenu && (
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-xl font-bold mb-4`}>Recommended Menu</Text>
            <TouchableOpacity
              style={tw`w-full max-h-60 rounded-lg ${
                isFromMenu &&
                selectedRestaurant === recommendedMenu.restaurant.id
                  ? 'border-2 border-blue-700'
                  : 'border-2'
              }`}
              onPress={onClickHandler}
            >
              <Image
                source={{
                  uri: recommendedMenu.picture_url,
                }}
                style={tw`w-full h-full self-center rounded-md`}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <Text style={tw`mt-4`}>Menu: {recommendedMenu.name}</Text>
            <Text>Price: {recommendedMenu.price}฿</Text>
            <Text>From: {recommendedMenu.restaurant.name}</Text>
          </View>
        )}
        {nearestRestaurants && (
          <View style={tw`flex-col mt-8`}>
            <Text style={tw`font-semibold text-xl mb-3`}>
              Nearest Restaurants
            </Text>
            <CardList
              list={nearestRestaurants}
              isNearest
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
              isFromMenu={isFromMenu}
              setIsFromMenu={setIsFromMenu}
            />
          </View>
        )}
        <View style={tw`flex-col mt-8`}>
          <Text style={tw`font-semibold text-xs text-orange-500 mb-3`}>
            ** Please considered choose your favourite restuarant and submit
          </Text>
          <TouchableOpacity
            style={tw` bg-blue-600 py-4 px-6 rounded flex-row justify-center`}
            onPress={onSubmitHandler}
          >
            <Text style={tw`text-white font-semibold`}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
