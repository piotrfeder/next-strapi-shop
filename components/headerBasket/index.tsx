import Link from 'next/link';
import styles from './styles/style.module.scss';

export default function HeaderBasket() {
  const basketItemsCount:number = 4;
  return (
    
    <Link href="/basket">
      <a  className={styles.header__basket}><span className={styles.header__items}>{basketItemsCount}</span></a>
    </Link>
  )
}