import { Container, Grid, GridItem } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Context } from "../../../pages/context";
import { useContext } from "react";
import CartItem from "../../Elements/cartItem";
import key from "weak-key";

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
  quantity: number
}

export default function Cart() {
  const { t } = useTranslation('common');
  const { state } = useContext(Context);
  return (
    <Container maxW="100%">
      <h3>{t('basket_text', { itemNumber: state.orders.length })}</h3>
      {state.orders.length > 0 ?
        <>
          <Grid templateColumns='65% 100px 200px 100px'>
            <GridItem colSpan={1}>{t('product')}</GridItem>
            <GridItem colSpan={1}>{t('price')}</GridItem>
            <GridItem colSpan={1}>{t('quantity')}</GridItem>
            <GridItem colSpan={1}>{t('total')}</GridItem>
          </Grid>
          {state.orders.map((item:ICardItem) => {
            return <CartItem item={item} key={key(item)}/>
          })}
        </>
        : null}
    </Container>
  )
}