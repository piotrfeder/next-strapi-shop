import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

interface IDelivery {
  __typename: string,
  id: string,
  attributes: {
    DeliveryName: string,
    DeliveryCost: number,
    delivery_types: {
      data: [
        {
          attributes: {
            DeliveryType: string
          }
        }
      ]
    }
  }
}

interface IDeliveries {
  deliveryData: IDelivery[],
  action: ({id, cost}:{id:number, cost:number}) => void,
  choosenOne: number | undefined
}

export default function DeliveryList({ deliveryData, action, choosenOne = undefined }:IDeliveries) {
  const [deliveryItems, setDeliveryItems] = useState<ReactNode[]>([])
  const [activeItem, setActiveItem ] = useState<string|undefined>('1');

  useEffect( () => {
    setActiveItem((choosenOne?.toString()))
  }, [choosenOne])
  useEffect(() => {
    const deliveries = [...deliveryItems]
    
    deliveryData.map((item: IDelivery) => {
      console.log('radio', choosenOne, parseInt(item.id), choosenOne && parseInt(item.id) === choosenOne)
      deliveries.push(<Radio value={item.id} key={item.id}>{item.attributes.DeliveryName} - {item.attributes.DeliveryCost}</Radio>);

    })
    setDeliveryItems(deliveries)
  }, [deliveryData])

  const handleDeliveryChange = (e:string) => {
    console.log('handledeliverychange', e)
    deliveryData.map((item: IDelivery) => {
      if (parseInt(item.id) === parseInt(e)) {
        console.log('handledeliverychange', e, item)
        action({id: parseInt(e), cost: item.attributes.DeliveryCost})
      }
    })
  }

  return (
    <RadioGroup value={activeItem} onChange={(e) => handleDeliveryChange(e)}>
      <Stack spacing={4} direction='column'>
        {deliveryItems}
      </Stack>
    </RadioGroup>
  )
}