import styles from './Subscribe.module.scss'

export default function Subscribe() {
  return (
    <div>
      <p className='text-white text-sm mb-2'>Join our mailing list</p>

      <form action='/subscribe' className={styles.subscribe}>
        <input
          type='text'
          name='q'
          className={styles.input}
          placeholder='Email Address'
        />

        <input type='submit' className={styles.submit} value='Subscribe' />
      </form>
    </div>
  )
}
