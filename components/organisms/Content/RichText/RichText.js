import HTMLReactParser from 'html-react-parser'
import styles from './RichText.module.scss'

export default function RichText({ children }) {
  return <div className={styles.root}>{HTMLReactParser(children)}</div>
}
