import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import TabTitle from "../../components/Elements/tabTitle";
import Cart from "../../components/Blocks/Cart";
import Shipping from "../../components/Blocks/Shipping";
import nookies from 'nookies';
import Strapi from "strapi-sdk-js";
import { gql, useMutation } from '@apollo/client';

const strapi = new Strapi();

interface IUser {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
}

export default function Basket({ user }: { user: IUser }) {
  const { t } = useTranslation('common');
  const {id} = user;
  const [shoppingChecked, setShoppingChecked] = useState<boolean>(false)
  const [billingChecked, setBillingChecked] = useState<boolean>(false)
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleShoppingBtnClick = () => {
    setTabIndex(1)
    if(!shoppingChecked) {
      setShoppingChecked(true)
    }
  }

  const handleBillingBtnClick = () => {
    setTabIndex(2)
    if(!billingChecked) {
      setBillingChecked(true)
    }
  }

  return(
    <>
    <Head>
    <title>{t('basket_title')}</title>
      <meta name="description" content={t('basket_description')} />
    </Head>
        <Container w="100%" maxW={"1218px"}>
          <Tabs isLazy isFitted index={tabIndex}>
            <TabList>
              <Tab w={'1/3'} onClick={() => setTabIndex(0)}>
                <TabTitle texts={{title: t('basket_cart'), desc:t('basket_cart_desc') , number: 1}} />
              </Tab>
              <Tab isDisabled={!shoppingChecked} onClick={() => setTabIndex(1)}>
                <TabTitle texts={{title: t('basket_shipping'), desc:t('basket_shipping_desc') , number: 2}} />
              </Tab>
              <Tab isDisabled={!billingChecked} onClick={() => setTabIndex(2)}>
                <TabTitle texts={{title: t('basket_payment'), desc:t('basket_payment_desc') , number: 3}} />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Cart />
                <Button colorScheme='blue' onClick={() => handleShoppingBtnClick()}>{t('basket_shipping_btn')}</Button>
              </TabPanel>
              <TabPanel>
                <Shipping userid={id}/>
                
              <Button colorScheme='blue' onClick={() => handleBillingBtnClick()}>{t('basket_payment_desc')}</Button>
              </TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
      </Container>
    </>

  )
}

export const getServerSideProps = async (ctx) => {

  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      strapi.axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
      user = await strapi.fetchUser();

    } catch (e) {
      console.log(e);
    }
  }
  return {
    props: {
      user
    }
  }
}