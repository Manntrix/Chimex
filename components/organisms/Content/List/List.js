import styles from './List.module.scss'

export default function List({ items }) {
  return (
    <ul className={styles.items}>
      {items?.map((item, index) => (
        <li key={index} className={styles.item}>
          {item.text}
        </li>
      ))}
    </ul>
  )
}
