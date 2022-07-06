import useTranslation from 'next-translate/useTranslation';
import { FormEvent } from 'react';
import styles from './styles/styles.module.scss'

export default function HeaderSearch() {
  const { t } = useTranslation('common')
  const searchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('searchSubmit value', e)
  }

  return (
    <div className={styles.headersearch}>
      <form id="searchbar" className={styles.headersearch__container} onSubmit={ (e) => searchSubmit(e)}>
        <input type="text" placeholder={t('headermenu_search')} id="search" className={styles.headersearch__input}/>
        <button type="submit" className={styles.headersearch__button}/>
      </form>
    </div>
  )
}