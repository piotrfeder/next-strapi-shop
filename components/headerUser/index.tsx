import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from './styles/styles.module.scss';
import {Context} from '../../pages/context';

export default function HeaderUser() {
  const { locale } = useRouter();
  const { t } = useTranslation('common')
  const { state } = useContext(Context);
  const [isLogged, setIsLogged] = useState<boolean>(false)
  useEffect(() => {
    if(state.user && state.user.id) {
      setIsLogged(true)
      return;
    }
    setIsLogged(false);
  }, [state])

  return (
    <div className={styles.userarea}>
      {isLogged ? <Link href="/profile" locale={locale}><a className={styles.userarea__item}>{t('headermenu_account')}</a></Link> : <><Link href="/login" ><a className={styles.userarea__item}>{t('headermenu_login')}</a></Link><Link href="/register"><a className={styles.userarea__item}>{t('headermenu_register')}</a></Link></>}
      </div>
  )
}