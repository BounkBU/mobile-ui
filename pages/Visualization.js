import { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { Chart, Navbar } from '../components'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Visualization() {
  const options = ['Food type', 'Price', 'Spicy']
  const [selectedData, setSelectedData] = useState()

  return (
    <SafeAreaView style={tw`h-full relative mx-3`}>
      <ScrollView>
        <View style={tw``}>
          <Text style={tw`text-2xl font-semibold`}>Data Visualization</Text>
          <View style={tw`w-full my-6`}>
            <SelectDropdown
              data={options}
              onSelect={(_, index) => {
                setSelectedData(index + 1)
              }}
              defaultButtonText={'Select data'}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                )
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <View style={tw`mt-24`}>
              <Chart index={selectedData} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})
