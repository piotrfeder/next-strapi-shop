import styles from './styles.module.scss'

interface IFormats {
  format: {
    attributes: {
      Format: string
    }
  },
  activeFormat: string,
  onClick: () => void
}

export function GetFormat ({format, activeFormat, onClick}:IFormats){
  const isActive = activeFormat.toUpperCase() === format.attributes.Format.toUpperCase() ? true : false;
  return(
    <div className={`${isActive ? styles.format__ItemActive : styles.format__Item }`} onClick={() => onClick()}>{format.attributes.Format}</div>
  )
}