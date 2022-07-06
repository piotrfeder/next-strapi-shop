import { gql, useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import styles from './styles/styles.module.scss';
import { useRouter } from 'next/router';
import ProductItem from '../productItem';
import key from 'weak-key';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiSortAlphabeticalDescending, mdiSortAlphabeticalAscending } from '@mdi/js';
import { Product } from '../../types';
/* interface Product {
  MainPhoto: {
    data: {
      attributes: {
        url: string
      }
    }
  }
  price?: number,
  Title: string,
  SEO: Array<string>,
  formats: {
    data: Array<{
      attributes: {
        Format: string,
        Price: number,
      }
    }>
  }
} */

const GETPRODUCTS = gql`
query($locale: I18NLocaleCode)  {
  products(locale: $locale) {
    data {
      id
      attributes {
        Title
        Slug
        formats {
          data {
            attributes {
              Format
              Price
            }
          }
        }   
        MainPhoto {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`

const handleFormatPrice = (format: string, list: Array<Product>): number => {
  let price = 0;
  list.filter((a) => {
    const itemFormats = a.attributes.formats.data;
    itemFormats.forEach((item) => {
      if (item.attributes.Format.toUpperCase() == format.toUpperCase()) {
        price = item.attributes.Price;
      }
    })
  })
  return price;
}

export default function MainProducts() {
  const { t } = useTranslation('common');
  const [productsList, setProductsList] = useState([])
  const [originalList, setOriginalList] = useState([])
  const [currentFormat, setCurrentFormat] = useState('a2');
  const { locale } = useRouter();
  const { loading, error, data } = useQuery(GETPRODUCTS, {
    variables: {
      locale
    },
    onCompleted: (data: Array<any>) => {
      const itemsList = data.products.data;
      let newItems: Array<any> = [];
      itemsList.forEach((item: Product) => {
        let itemAttrs = item.attributes
        let itemNew = { ...itemAttrs, price: handleFormatPrice('a2', itemsList), id: item.id };
        newItems.push(itemNew)
      })
      setProductsList(newItems); setOriginalList(newItems)
    }
  });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>
  }

  const handleFilterByFormat = (format: string) => {
    setCurrentFormat(format);
    let productsNew = [...originalList];
    const newProds = productsNew.filter((a: Product) => {
      const itemFormats = a.formats.data;
      itemFormats.forEach((item) => {
        if (item.attributes.Format.toUpperCase() == format.toUpperCase()) {
          a.price = item.attributes.Price;
        }
      })
      return a;
    })
    setProductsList(newProds);
  }

  const handleSortByNameASC = () => {
    const productsNew = [...originalList];
    productsNew.sort((a: Product, b: Product): number => {
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
    })
    setProductsList(productsNew)
  }
  const handleSortByNameDESC = () => {
    const productsNew = [...originalList];
    productsNew.sort((a: Product, b: Product): number => {
      if (a.Title > b.Title) {
        return -1;
      }
      if (a.Title < b.Title) {
        return 1;
      }
      return 0;
    })
    setProductsList(productsNew)
  }

  return (
    <section id="products" className={styles.mainproducts}>
      <div className={styles.mainproducts__wrapper}>
        <div className={styles.mainproducts__upper}>
          <div className={styles.mainproducts__upper__left}>
            <h3 className={styles.mainproducts__title}>{t('ourposters')}</h3>
          </div>
          <div className={styles.mainproducts__upper__right}>
            <div className={styles.mainproducts__sort}>
              <p>{t('sortby')}</p>
              <span className={styles.mainproducts__sort__item}>{t('sort_name')} - <span className={styles.mainproducts__sort__icon} onClick={() => handleSortByNameASC()}><Icon path={mdiSortAlphabeticalAscending}
                
                size={1}
                color='#cbcbcb' /></span><span className={styles.mainproducts__sort__icon} onClick={() => handleSortByNameDESC()}><Icon path={mdiSortAlphabeticalDescending}
                
                  size={1}
                  color='#cbcbcb' /></span></span>
            </div>
            <div className={styles.mainproducts__show}>
              <span>{t('show_format')}</span>
              <span className={[styles.mainproducts__show__item, currentFormat === 'a2' ? styles.mainproducts__show__item__active : styles.mainproducts__show__item__inactive].join(' ')} onClick={() => handleFilterByFormat('a2')}>{t('a2')}</span>
              <span className={[styles.mainproducts__show__item, currentFormat === 'b2' ? styles.mainproducts__show__item__active : styles.mainproducts__show__item__inactive].join(' ')} onClick={() => handleFilterByFormat('b2')}>{t('b2')}</span>
              <span className={[styles.mainproducts__show__item, currentFormat === 'b1' ? styles.mainproducts__show__item__active : styles.mainproducts__show__item__inactive].join(' ')} onClick={() => handleFilterByFormat('b1')}>{t('b1')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainproducts__list}>
        {productsList.length > 0 ? productsList.map((item: Product) => {
          console.log('pi', item);
          return <ProductItem key={key(item)} product={item} />
        }) : null}
      </div>
    </section>
  )
}
