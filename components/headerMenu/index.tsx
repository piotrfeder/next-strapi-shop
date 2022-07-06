
import key from 'weak-key';
import styles from './styles/styles.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'

export default function HeaderMenu() {
  const { locale } = useRouter();
  const { t } = useTranslation('common')

  const menuItems: { name: string, url: string }[] = [{ name: t('headermenu_homepage'), url: '/' }, { name: t('headermenu_tracks'), url: '/tory' }, { name: t('headermenu_contact'), url: '/kontakt' }];
  const menuList = menuItems.map((item: { name: string, url: string }) => {
    return <Link href={item.url} key={key(item)} locale={locale}><a className={styles.menu__item}>{item.name}</a></Link>
  })
  return (
    <nav className={styles.menu}>
      {menuList}
    </nav>
  )
}