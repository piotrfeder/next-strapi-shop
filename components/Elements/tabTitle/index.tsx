import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export default function TabTitle({texts}:{texts: {title:string, desc:string, number: number}}) {
return(
  <Stack spacing={8} direction={"row"}>
    <Text fontSize={'72'}>{texts.number}</Text>
    <Box>
      <Heading fontSize="32">{texts.title}</Heading>
      <Text mt={4}>{texts.desc}</Text>
    </Box>
  </Stack>
)
}