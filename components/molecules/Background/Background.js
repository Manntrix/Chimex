import Image from '@/components/atoms/Image'
import styles from './Background.module.scss'

export default function Background({ image, alt, overlay }) {
  const renderHTTPImage = (image) => {
    if (image?.startsWith('//')) {
      return `https:${image}`
    } else {
      return image
    }
  }

  return (
    <div className={styles.root}>
      {image && (
        <Image
          src={renderHTTPImage(image)}
          alt={alt}
          fill={true}
          cover={true}
          overlay={overlay}
        />
      )}
    </div>
  )
}
