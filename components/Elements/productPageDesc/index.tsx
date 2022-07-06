import styles from './styles/styles.module.scss';

interface Props  {
  title: string,
  description: string
}

export default function ProductPageTexts({title, description}:Props) {
  return (
    <div className={styles.productDesc__container}>
      <h1 className={styles.productDesc__title}>{title}</h1>
      <p className={styles.productDesc__description}>{description}</p>
    </div>
  )
}