import Image from '@/components/atoms/Image'
import { LinkedinShareButton, TwitterShareButton } from 'next-share'

export default function Share({ title, slug }) {
  return (
    <div>
      <TwitterShareButton
        url={`https://www.chimecentral.org/${slug}/`}
        title={title}
        style={{
          marginRight: '12px',
        }}
      >
        <Image
          src='/icons/twitter-gray.svg'
          alt='Twitter'
          width={24}
          height={24}
        />
      </TwitterShareButton>

      <LinkedinShareButton
        url={`https://www.chimecentral.org/${slug}/`}
        title={title}
        style={{
          marginRight: '12px',
        }}
      >
        <Image
          src='/icons/linkedin-gray.svg'
          alt='LinkedIn'
          width={24}
          height={24}
        />
      </LinkedinShareButton>
    </div>
  )
}
