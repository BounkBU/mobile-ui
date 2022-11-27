import { ScrollView } from 'react-native'
import Card from './Card'

export default function CardList({ list }) {
  return (
    <ScrollView horizontal>
      {list.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </ScrollView>
  )
}
