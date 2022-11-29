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
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(minPrice)
  const [minPriceOfType, setMinPriceOfType] = useState()

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
    async function onFetchFoodType() {
      const response = await client.get('/menus/type')
      setFoodTypeOptions(response.data.map((data) => data.type))
    }
    onFetchFoodType()
  }, [])

  useEffect(() => {
    async function onFetchMinPrice() {
      const response = await client.get('/menus/type/min-price')
      setMinPriceOfType(response.data)
    }
    onFetchMinPrice()
  }, [])

  useEffect(() => {
    if (!minPriceOfType || !foodType) return
    setMinPrice(minPriceOfType[foodType])
    setMaxPrice(minPriceOfType[foodType])
  }, [foodType])

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
      setNearestRestaurants(response.data.nearest_restaurant)
      setInitialState()
    }
    onFetchSubmitForm()
  }, [isSubmittedForm])

  function setInitialState() {
    setAreaId()
    setFoodType()
    setSpicyness('spicy')
    setMaxPrice(0)
  }

  if (!isSubmittedForm) {
    if (!areaOptions || !foodTypeOptions) return null

    return (
      <Form
        areaOptions={areaOptions}
        foodTypeOptions={foodTypeOptions}
        areaId={areaId}
        foodType={foodType}
        spicyness={spicyness}
        minPrice={minPrice}
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
