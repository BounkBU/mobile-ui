import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import tw from 'twrnc'
import { CardList, Navbar, Select } from '../components'
import { RadioButton } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import { capitalizeString } from '../utils/capitalizeString'

export default function Form({
  areaOptions,
  foodTypeOptions,
  areaId,
  foodType,
  spicyness,
  maxPrice,
  setAreaId,
  setFoodType,
  setSpicyness,
  setMaxPrice,
  setIsSubmittedForm,
  popularRestaurants,
}) {
  const facultyOptions = []
  areaOptions.forEach((data) =>
    facultyOptions.push(`Faculty of ${capitalizeString(data)}`),
  )
  const typeOptions = []
  foodTypeOptions.forEach((data) => typeOptions.push(capitalizeString(data)))

  function onSubmitHandler() {
    if (!areaId || !foodType) return
    setIsSubmittedForm(true)
  }

  return (
    <SafeAreaView style={tw`h-full mx-5 relative`}>
      <ScrollView>
        <View style={tw`w-44 h-44 mx-auto`}>
          <Image
            style={tw`w-full h-full self-center`}
            resizeMode={'cover'}
            source={require('../assets/kurester.png')}
          />
        </View>
        <View style={tw`flex-col mt-2`}>
          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Your Area:</Text>
            <Select options={facultyOptions} setAction={setAreaId} />
          </View>
          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Food Type:</Text>
            <Select options={typeOptions} setAction={setFoodType} isFoodType />
          </View>
          {foodType === 'drink' || foodType === 'buffet' ? null : (
            <View style={tw`flex-col my-2`}>
              <Text style={tw`text-lg mb-2`}>Spicyness:</Text>
              <View style={tw`flex-col`}>
                <RadioButton.Group
                  onValueChange={(value) => setSpicyness(value)}
                  value={spicyness}
                >
                  <RadioButton.Item label='Spicy' value='spicy' />
                  <RadioButton.Item label='Not Spicy' value='no-spicy' />
                </RadioButton.Group>
              </View>
            </View>
          )}

          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Max Price: {maxPrice}฿</Text>
            <Slider
              value={maxPrice}
              onValueChange={(value) => setMaxPrice(value)}
              step={10}
              maximumValue={1000}
            />
          </View>
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              style={tw` bg-blue-600 py-4 px-6 rounded`}
              onPress={onSubmitHandler}
            >
              <Text style={tw`text-white font-semibold`}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col my-8`}>
            <Text style={tw`text-xl font-semibold mb-3`}>
              Popular Restaurants
            </Text>
            {popularRestaurants && <CardList list={popularRestaurants} />}
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}
