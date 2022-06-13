import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import { AdCard, EventHighlightCard } from '@/components/molecules/Card'

export default function ThreeColumnEvents({ gap, post_1, post_2, ad }) {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(137, 187, 223, 0) 0%, rgba(43, 135, 200, 0.12) 100%)',
      }}
    >
      <Section className='relative py-8'>
        <h3 className='text-gray-600 font-bold tracking-widest mb-4 uppercase'>
          EVENT HIGHLIGHTS
        </h3>

        <div
          className={`grid lg:grid-cols-3 gap-${gap} lg:gap-${gap * 2} mb-16`}
        >
          <EventHighlightCard eventId={post_1} />

          <EventHighlightCard eventId={post_2} />

          <div className='flex justify-center'>
            <AdCard ad={ad} />
          </div>
        </div>

        <div className='absolute right-0 bottom-8 -z-10'>
          <Image
            src='/images/event-highlights-shape.svg'
            width={610}
            height={590}
          />
        </div>
      </Section>
    </div>
  )
}
