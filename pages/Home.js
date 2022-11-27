import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Slider,
  TouchableOpacity,
} from 'react-native'
import tw from 'twrnc'
import { CardList, Navbar, Select } from '../components'
import { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { useAppDispatch } from '../app/hooks'
import { fetchSubmitForm } from '../featues/app/appSlice'

export default function Home() {
  const areaOptions = ['Engineering', 'Science']
  const foodTypeOptions = ['Noodles', 'Rice', 'Drink']
  const [areaId, setAreaId] = useState()
  const [foodType, setFoodType] = useState()
  const [spicyness, setSpicyness] = useState('spicy')
  const [maxPrice, setMaxPrice] = useState(0)
  const dispatch = useAppDispatch()

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

  async function onSubmitHandler() {
    if (!areaId || !foodType) return
    const body = {
      facultyID: areaId,
      type: foodType,
      is_spicy: spicyness === 'spicy' ? true : false,
      price: maxPrice,
    }
    const response = dispatch(fetchSubmitForm(body))
    console.log(response)
  }

  return (
    <SafeAreaView style={tw`h-full mx-5 relative`}>
      <ScrollView>
        <View style={tw`w-44 h-44 mx-auto`}>
          <Image
            style={tw`w-full h-full object-cover`}
            source={require('../assets/kurester.png')}
          />
        </View>
        <View style={tw`flex-col mt-2`}>
          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Your Area:</Text>
            <Select options={areaOptions} setAction={setAreaId} />
          </View>
          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Food Type:</Text>
            <Select
              options={foodTypeOptions}
              setAction={setFoodType}
              isFoodType
            />
          </View>
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
          <View style={tw`flex-col my-2`}>
            <Text style={tw`text-lg mb-2`}>Max Price: {maxPrice}฿</Text>
            <Slider
              value={maxPrice}
              onValueChange={(value) => setMaxPrice(value)}
              step={10}
              maximumValue={500}
            />
          </View>
          <View style={tw`flex-row justify-end mt`}>
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
            <CardList list={mock} />
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}
