

import Link from 'next/link';
import GetImage from '../Elements/getImage';
import styles from './styles/styles.module.scss'

export default function MainSlide({slideData}) {
  console.log('slideItem',slideData)
  return (
    <div className={styles.mainslide}>
      <div className={styles.mainslide__left}>
        <div className={styles.mainslide__left__title}>
          <p>{slideData.Title}</p>
        </div>
        <div className={styles.mainslide__left__text}>
          <p>{slideData.Text}</p>
        </div>
        <div className={styles.mainslide__left__button}>
          { slideData.ButtonUrl ? <Link href={slideData.ButtonUrl}>{slideData.ButtonText}</Link> : null}
        </div>
      </div>
      <div className={styles.mainslide__right}>
        <div className={styles.mainslide__image}>
          <GetImage imageData={slideData.Image} />
        </div>
      </div>
    </div>
  )
}