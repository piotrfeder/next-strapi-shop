import styles from './styles/styles.module.scss';
import useTranslation from 'next-translate/useTranslation'
import { FormEventHandler } from 'react';

export default function Newsletter() {
  const { t } = useTranslation('common')

  const handleSubmit = (e:MouseEvent) => {
    e.preventDefault();
    fetch('api/newsletter-signup').then(response => response.json())
    .then(data => console.log(data));
  }

  return(
    <div className={styles.newsletter}>
      <div className={styles.newsletter__container}>
        <div className={styles.newsletter__container__left}>
          <h4 className={styles.newsletter__title}>{t('newsletter_title')}</h4>
          <p className={styles.newsletter__subtitle}>{t('newsletter_subtitle')}</p>
        </div>
        <div className={styles.newsletter__container__right}>
          <form name="newsletter" onSubmit={(e) => handleSubmit(e) }>
            <input className={styles.input} type="email" id="newsletter" placeholder={t('newsletter_placeholder')} />
            <button className={styles.button__orange} >{t('newsletter_button')}</button>
            <div className={styles.checkbox__container}>
              <div className={styles.checkbox__container__input}>
                <input type="checkbox" id="consent1"/>
                <label htmlFor="consent1"/>
              </div>
              <div className={styles.checkbox__container__text}>
                <p>{t('newsletter_consent1')}</p>
              </div>
            </div>
            <div className={styles.checkbox__container}>
              <div className={styles.checkbox__container__input}>
                <input type="checkbox" id="consent2"/>
                <label htmlFor="consent2"/>
              </div>
              <div className={styles.checkbox__container__text}>
                <p>{t('newsletter_consent2')}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}