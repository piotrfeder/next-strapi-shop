import { Box, ButtonProps, useRadio, UseRadioProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IProps {
  children: ReactNode
}

type RadioButtonProps = ButtonProps & {
  isChecked?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
};

export default function RadioBtn (props:IProps) {
  // @ts-ignore: Unreachable code error
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as="label">
      <input {...input} />
      <Box 
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        >
          {props.children}
        </Box>
    </Box>
  )
}