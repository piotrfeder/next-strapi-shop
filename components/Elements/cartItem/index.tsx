import { Container, Grid, GridItem } from "@chakra-ui/react";
import NumberInputEl from "../nubmerImput";
import { Context } from "../../../pages/context";
import { useContext } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import DeliveryList from "../deliveryItems";

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

interface ICardItem {
  Title: string,
  activeFormat: {
    name: string,
    price: number
  },
  deliveryInfo: {
    id: number,
    cost: number,
  }
  id: string,
  quantity: number,
  deliveriesList: [IDelivery]
}

export default function CartItem({ item }: { item: ICardItem }) {
  const { dispatch } = useContext(Context);
  console.log('card item', item)
  const handleQuantityChange = (value: number) => {
    dispatch({ type: 'changeBasketQuantity', payload: { value, id: item.id } })
  }
  const handleDeleteProduct = (id: string, format: string) => {
    dispatch({type: 'deleteProductFromBasket', payload: {id, format}})
    console.log('deleteproduct')
  }
  return (
    <Container maxW="100%">
      <Grid templateColumns='65% 100px 200px 100px 50px'>
        <GridItem colSpan={1}>{item.Title}</GridItem>
        <GridItem colSpan={1}>{item.activeFormat.price}</GridItem>
        <GridItem colSpan={1}><NumberInputEl init={item.quantity} action={(v) => handleQuantityChange(v)} /></GridItem>
        <GridItem colSpan={1}>{item.quantity * item.activeFormat.price}</GridItem>
        <GridItem colSpan={1} onClick={() => handleDeleteProduct(item.id, item.activeFormat.name)}><DeleteIcon/></GridItem>
        <DeliveryList deliveryData={item.deliveriesList} choosenOne={item.deliveryInfo.id} action={() => console.log()}/>
      </Grid>
    </Container>
  )
}