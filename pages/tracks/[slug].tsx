import { gql } from "@apollo/client";
import Head from "next/head";
import client from "../../client/apollo-client";
import ProductPageTexts from "../../components/Elements/productPageDesc";
import styles from '../../styles/ProductPage.module.scss';
import ShowPrice from "../../components/Elements/price";
import useTranslation from "next-translate/useTranslation";
import { Format } from "../../types";
import { useContext, useEffect, useState } from "react";
import RadiosGroup from "../../components/Elements/radioGroup";
import NumberInputEl from "../../components/Elements/nubmerImput";
import { Accordion, Button, Container, Icon } from "@chakra-ui/react";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { Context } from "../context";
import AccordionItemSingle from "../../components/Elements/accordionItem";
import DeliveryList from "../../components/Elements/deliveryItems";
import ProductSlider from "../../components/productSlider";

interface IActiveFormat {
  name: string | null,
  price: number | null
}



const GETPRODUCT = gql`
query($slug:StringFilterInput, $locale:I18NLocaleCode) {
  deliveries {
    data {
      id
      attributes {
        DeliveryName
        DeliveryCost
        delivery_types {
          data {
            attributes {
              DeliveryType
            }
          }
        }
      }
    }
  }
  products(filters: {Slug:$slug },locale: $locale) {
    data {
      id
      attributes {
        Title
        ProductCode
        Manufacturer
        Price
        Stock
        SEO {
          SEO_Text
          SEO_Slug
          SEO_Title
          SEO_Keywords
        }
        DeliveryTime
        Description
        ShortDescription
        formats {
          data {
            attributes {
              Height
              Width
              Format
              delivery_type {
                data {
                  attributes {
                    DeliveryType
                  }
                }
              }
              Price
            }
          }
        }
        MainPhoto {
          data {
            attributes {
              url
              alternativeText
              width
              height
            }
          }
        }
        Gallery {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}
`

export default function SingleTrack({ track }) {
  const { t } = useTranslation('common')
  const { products, deliveries } = track;
  const { Price, Description, ShortDescription, Stock, Title, SEO, MainPhoto, Gallery, DeliveryTime, formats } = products.data[0].attributes;
  const [activeFormat, setActiveFormat] = useState<IActiveFormat>({ name: 'A2', price: 39.90 })
  const [quantity, setQuantity] = useState(1);
  const [formatsList, setFormatsList] = useState<string[] | []>([]);
  const [itemsPrice, setItemsPrice] = useState<number>(Price);
  const [priceWithoutDelivery, setPriceWithoutDelivery] = useState<number>(Price)
  const [deliveryInfo, setDeliveryInfo] = useState<{id:number, cost: number}>({id:0, cost: 0})
  const [deliveriesList, setDeliveriesList ] = useState(deliveries.data);
  const GalleryItems = Gallery.data;
  const { dispatch } = useContext(Context);

  useEffect(() => {
    let newArray: string[] = [];
    formats.data.map((item: Format) => {
      newArray.push(item.attributes.Format);
    })
    setFormatsList(newArray)
  }, [])


  console.log('track props', products, deliveries)
  const handleActiveFormat = (format: string) => {
    let activeItem: IActiveFormat = {
      name: null,
      price: null
    }
    formats.data.map((item: Format) => {
      if (item.attributes.Format === format.toUpperCase()) {
        activeItem.name = item.attributes.Format;
        activeItem.price = item.attributes.Price;
      }
    })
    if (activeItem.price) {
      setItemsPrice(Math.round(((activeItem.price * quantity) + deliveryInfo.cost) * 100) / 100)
      setPriceWithoutDelivery(Math.round((activeItem.price * quantity) * 100) / 100)
    }
    setActiveFormat(activeItem)
  }

  const handleQuantity = (quantity: number) => {
    setQuantity(quantity)
    if (activeFormat.price) {
      setItemsPrice(Math.round(((activeFormat.price * quantity) + deliveryInfo.cost) * 100) / 100)
      setPriceWithoutDelivery(Math.round((activeFormat.price * quantity) * 100) / 100)
    }
  }

  const handleAddToBasket = () => {
    const orderSingle = {
      id: products.data[0].id,
      quantity,
      activeFormat,
      Title,
      deliveryInfo,
      deliveriesList
    }
    dispatch({ type: 'addToBasket', payload: orderSingle })
  }

  const handleDelivery = ({id, cost}:{id:number, cost: number}) => {
    setDeliveryInfo({id, cost})
    setItemsPrice(Math.round((priceWithoutDelivery + cost) * 100) / 100)
  }

  return (<div className={styles.product}>
    <Head>
      <title>{SEO.SEO_Title}</title>
      <meta name="description" content={SEO.SEO_Text} />
      <meta property="og:description" content={SEO.SEO_Text} />
      <meta property="og:title" content={SEO.SEO_Title} />
    </Head>
    <div className={styles.product__left}>
      <ProductSlider images={GalleryItems} />
    </div>
    <div className={styles.product__right}>
      <ProductPageTexts title={Title} description={ShortDescription} />
      <div className={styles.product__formats}>
        <p className={styles.product__format__title}>{t('choose_format')}</p>
        <RadiosGroup options={formatsList} action={handleActiveFormat} />
      </div>
      <div className={styles.product__price}>
        <p className={styles.product__price__title}>{t('quantity')} {quantity}</p>
        <NumberInputEl init={quantity} action={handleQuantity} />
      </div>
      <div className={styles.product__price}>
        <p className={styles.product__price__title}>{t('price')}</p>
        <ShowPrice price={itemsPrice} />
      </div>
      <Button colorScheme='pink' variant='solid' loadingText={t('choose_format')} onClick={() => handleAddToBasket()}>
        <Icon as={MdOutlineShoppingBasket} />{t('add_to_basket')}
      </Button>
      <Container mt={'20px'} maxW='100%'>
        <Accordion allowToggle>
          <AccordionItemSingle title={t('description')}>
            <p>{Description}</p>
          </AccordionItemSingle>
          <AccordionItemSingle title={t('delivery')}>
            <DeliveryList deliveryData={deliveries.data} action={handleDelivery}/>
          </AccordionItemSingle >
        </Accordion>
      </Container>

    </div>
  </div>)
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GETPRODUCT,
    variables: {
      slug: { eq: context.params.slug },
      locale: context.locale
    }
  });

  return {
    props: {
      track: data,
    },
  };
}