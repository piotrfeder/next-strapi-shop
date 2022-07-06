import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface INumbersInput  {
  init?: number,
  min?: number,
  max?: number,
  action?: (quantity: number) => void
}

export default function NumberInputEl({ init = 1, min = 1, max = 100, action = () => {}}:INumbersInput) {
  const [value, setValue] = useState(init);

  const handleValueChage = (isUp:boolean) => {
    if (isUp) {
      setValue(value + 1)
    } else {
      if (value > 1)
      setValue(value - 1)
    }
  }
  useEffect(() => {
    action(value)
  }, [value])
  return (
    <HStack maxW='320px'>
    <Button onClick={() => {handleValueChage(true) }}>+</Button>
    <NumberInput min={min} max={max} value={value}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    <Button onClick={() => handleValueChage(false)}>-</Button>
  </HStack>
  )
}