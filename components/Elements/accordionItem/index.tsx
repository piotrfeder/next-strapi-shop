import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IAccordionItem {
  title: string,
  children: ReactNode
}

export default function AccordionItemSingle({ title, children }: IAccordionItem) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}