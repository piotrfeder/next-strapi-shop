import styles from './styles/styles.module.scss';
import Icon from '@mdi/react';
import { mdiFacebook, mdiInstagram } from '@mdi/js';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__bottom }>
          <div className={styles.footer__left}>
            <p>Copyrights {new Date().getFullYear()} © RaceTrackPosters.pl, All Rights Reserved</p>
          </div>
          <div className={styles.footer__right}>
            <div className={styles.footer__socials}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Icon path={mdiFacebook}
                className={styles.footer__social_item}
                size={1}
                color='#cbcbcb'/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Icon path={mdiInstagram}
                className={styles.footer__social_item}
                size={1}
                color='#cbcbcb'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}