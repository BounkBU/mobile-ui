import { useState } from 'react'
import { useEffect } from 'react'
import client from '../client'
import Form from './Form'
import Information from './Information'

export default function Home() {
  const [isSubmittedForm, setIsSubmittedForm] = useState(false)

  const [areaOptions, setAreaOptions] = useState()
  const [faculties, setFaculties] = useState()
  const [foodTypeOptions, setFoodTypeOptions] = useState()
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
    async function onFetchAllFaculty() {
      const response = await client.get('/faculties')
      setFaculties(response.data)
      setAreaOptions(
        response.data.map((data) => {
          return data.name
        }),
      )
    }
    onFetchAllFaculty()
  }, [])

  useEffect(() => {
    async function onFetchPopularRestaurants() {
      const response = await client.get('/menus/type')
      setFoodTypeOptions(response.data.map((data) => data.type))
    }
    onFetchPopularRestaurants()
  }, [])

  useEffect(() => {
    async function onFetchSubmitForm() {
      if (!isSubmittedForm) return
      const body = {
        faculty_id: faculties.filter((faculty) => {
          return faculty.name === areaId
        })[0].id,
        type: foodType,
        is_spicy:
          foodType === 'drink' || foodType === 'buffet'
            ? false
            : spicyness === 'spicy'
            ? true
            : false,
        price: maxPrice,
      }
      console.log(body)
      const response = await client.post('/form', body)
      console.log(response)
      setRecommendMenu(response.data.recommended_menu)
      setNearestRestaurants(response.data.nearest_restaurants)
      setSpicyness('spicy')
      setMaxPrice(0)
    }
    onFetchSubmitForm()
  }, [isSubmittedForm])

  if (!isSubmittedForm) {
    if (!areaOptions || !foodTypeOptions) return null

    return (
      <Form
        areaOptions={areaOptions}
        foodTypeOptions={foodTypeOptions}
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
