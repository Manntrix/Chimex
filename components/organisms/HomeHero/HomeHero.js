import Background from '@/components/molecules/Background'
import getMedia from '@/functions/fetch/wordpress/getMedia'

export default function HomeHero({ title, subtitle, featured_media }) {
  const { data: thumbnail } = getMedia(featured_media)

  return (
    <div style={{ marginTop: '-78px' }}>
      <div className='relative'>
        <Background image={thumbnail?.source_url} overlay='dark' />

        <div className='absolute top-32 lg:top-48 text-center w-full'>
          <h3
            className='text-lg font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-bright to-white'
            style={{ letterSpacing: '20px' }}
          >
            {subtitle}
          </h3>
        </div>

        <div
          className='py-56 bg-clip-text text-transparent bg-cover bg-center'
          style={{ backgroundImage: `url(${thumbnail?.source_url})` }}
        >
          <h1 className='max-w-4xl mx-auto text-7xl leading-none lg:text-8xl font-extrabold font-work text-center'>
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}
