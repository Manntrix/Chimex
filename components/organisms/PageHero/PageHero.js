import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Section from '@/components/atoms/Section'
import Background from '@/components/molecules/Background'
import unEntry from '@/functions/unEntry'

export default function PageHero({ breadcrumbs, title, background_image }) {
  return (
    <div className='relative'>
      {background_image ? (
        <Background image={background_image} />
      ) : (
        <div className='absolute w-full h-full bg-gradient-to-r from-blue-sky to-blue-turquoise -z-10'></div>
      )}

      <Section className='py-5'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <h1 className='text-white font-bold text-4xl md:text-7xl my-12 lg:my-20'>
          {unEntry(title)}
        </h1>
      </Section>
    </div>
  )
}
