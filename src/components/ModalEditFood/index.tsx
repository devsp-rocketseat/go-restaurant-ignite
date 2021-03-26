import { useEffect, useState } from 'react'

import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  editingFood: FoodProps
  handleUpdateFood: (food: FoodProps) => void
}

interface FoodProps {
  id: number
  name: string
  description: string
  price: string
  image: string
  available: boolean
}

const ModalEditFood = ({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps): JSX.Element => {
  const [image, setImage] = useState(editingFood.image)
  const [name, setName] = useState(editingFood.name)
  const [price, setPrice] = useState(editingFood.price)
  const [description, setDescription] = useState(editingFood.description)

  useEffect(() => {
    setImage(editingFood.image)
    setName(editingFood.name)
    setPrice(editingFood.price)
    setDescription(editingFood.description)
  }, [editingFood])

  const handleSubmit = () => {
    const editedFood = { ...editingFood, image, name, price, description }
    handleUpdateFood(editedFood)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Prato</h1>

        <Input value={image} onChange={e => setImage(e.target.value)} placeholder="Cole o link aqui" />
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Moda Italiana" />
        <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: 19.90" />
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>

          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
