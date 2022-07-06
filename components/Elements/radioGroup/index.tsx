import { HStack, useRadioGroup } from "@chakra-ui/react"
import RadioBtn from "../radioBtn"

interface IProps {
  options: string[]
  action: (format:string) => void
}

export default function RadiosGroup({options, action }:IProps) {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'format',
    defaultValue: 'A2',
    onChange: (e:string) => action(e),
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioBtn key={value} {...radio}>
            {value}
          </RadioBtn>
        )
      })}
    </HStack>
  )
}