import { useState } from 'react'
import { useEffect } from 'react'
import client from '../client'
import Form from './Form'
import Information from './Information'

export default function Home() {
  const [isSubmittedForm, setIsSubmittedForm] = useState(false)

  const [areaId, setAreaId] = useState()
  const [foodType, setFoodType] = useState()
  const [spicyness, setSpicyness] = useState('spicy')
  const [maxPrice, setMaxPrice] = useState(0)

  const [popularRestaurants, setPopularRestaurants] = useState()
  const [recommendedMenu, setRecommendMenu] = useState()
  const [nearestRestaurants, setNearestRestaurants] = useState()

  useEffect(() => {
    async function onFetchPopularRestaurants() {
      const response = await client.get('/restaurants/popular')
      setPopularRestaurants(response.data)
    }
    onFetchPopularRestaurants()
  }, [])

  useEffect(() => {
    async function onFetchSubmitForm() {
      if (!isSubmittedForm) return
      const body = {
        faculty_id: areaId,
        type: foodType,
        is_spicy:
          foodType === 'noodle' || foodType === 'rice'
            ? false
            : spicyness === 'spicy'
            ? true
            : false,
        price: maxPrice,
      }
      console.log(body)
      const response = await client.post('/form', body)
      console.log(response.data)
      setRecommendMenu(response.data.recommended_menu)
      setNearestRestaurants(response.data.nearest_restaurants)
    }
    onFetchSubmitForm()
  }, [isSubmittedForm])

  if (!isSubmittedForm) {
    return (
      <Form
        areaId={areaId}
        foodType={foodType}
        spicyness={spicyness}
        maxPrice={maxPrice}
        setAreaId={setAreaId}
        setFoodType={setFoodType}
        setSpicyness={setSpicyness}
        setMaxPrice={setMaxPrice}
        setIsSubmittedForm={setIsSubmittedForm}
        popularRestaurants={popularRestaurants}
      />
    )
  }

  return (
    <Information
      recommendedMenu={recommendedMenu}
      nearestRestaurants={nearestRestaurants}
      setIsSubmittedForm={setIsSubmittedForm}
    />
  )
}
