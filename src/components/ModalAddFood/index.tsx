import { useState } from 'react'

import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface ModalAddFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleAddFood: (food: FoodProps) => void
}

interface FoodProps {
  name: string
  description: string
  price: string
  image: string
}

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps): JSX.Element => {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    const newFood = { image, name, price, description }
    handleAddFood(newFood)
    setIsOpen()

    setImage('')
    setName('')
    setPrice('')
    setDescription('')
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>

        <Input placeholder="Cole o link aqui" value={image} onChange={e => setImage(e.currentTarget.value)} />
        <Input placeholder="Ex: Moda Italiana" value={name} onChange={e => setName(e.currentTarget.value)} />
        <Input placeholder="Ex: 19.90" value={price} onChange={e => setPrice(e.currentTarget.value)} />
        <Input placeholder="Descrição" value={description} onChange={e => setDescription(e.currentTarget.value)} />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>

          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
