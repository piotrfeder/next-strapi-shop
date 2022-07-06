import { mdiCardsHeartOutline, mdiBasketPlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import GetImage from '../Elements/getImage';
import styles from './styles/styles.module.scss';
import Link from 'next/link';
import { Product } from '../../types';

export default function ProductItem({product}: Product) {
  console.log('product item',product)
  return (
    <Link href={{pathname: `tracks/[slug]`, query: {slug: product.Slug}}}>
      <a className={styles.product__container}>
        <div className={styles.product__title_box}>
          <h4 className={styles.product__title}>{product.Title}</h4>
        </div>
        <div className={styles.product__price_box}>
          <p className={styles.product__price}>{product.price}</p>
          <div className={styles.product__add_fav}>
            <Icon 
            path={mdiCardsHeartOutline}
            size={1}
            color='#cbcbcb'
            />
          </div>
          <div className={styles.product__basket_icon}>
            <Icon 
              path={mdiBasketPlusOutline}
              size={1}
              color='#cbcbcb'
            />
          </div>
        </div>
        <div className={styles.product__image}>
          <GetImage imageData={product.MainPhoto}/>
        </div>
      </a>
    </Link>
  )
}