import HeaderBasket from '../headerBasket';
import HeaderMenu from '../headerMenu/index';
import HeaderSearch from '../headerSearch';
import HeaderUser from '../headerUser';
import styles from './styles/styles.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__left}>
          <HeaderMenu />
        </div>
        <div className={styles.header__right}>
          <HeaderSearch />
          <HeaderUser/>
          <HeaderBasket />
        </div>
      </div>
    </header>
  )
}