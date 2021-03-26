import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

interface FoodProps {
  id: number
  name: string
  description: string
  price: string
  image: string
  available: boolean
}

type FoodInputProps = Omit<FoodProps, 'id' | 'available'>

const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadFood() {
      const response = await api.get('/foods')

      setFoods(response.data)
    }

    loadFood()
  }, [])

  const handleAddFood = async (food: FoodInputProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      setFoods(oldValue => [...oldValue, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const editingFoodObj = { ...editingFood, ...food }

      const foodUpdated = await api.put(`/foods/${editingFood.id}`, editingFoodObj)

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  const toggleModal = () => setModalOpen(oldValue => !oldValue)

  const toggleEditModal = () => setEditModalOpen(oldValue => !oldValue)

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
