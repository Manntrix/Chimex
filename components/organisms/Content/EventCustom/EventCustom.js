import Divider from '@/components/atoms/Divider'
import Section from '@/components/atoms/Section'
import RichText from '../RichText'

export default function EventCustom({ anchor, title, description, content }) {
  return (
    <div>
      <div id={anchor} className='relative py-8'>
        <Section>
          <h2 className='text-2xl font-bold mb-4'>{title}</h2>

          {description && (
            <p className='text-lg text-center max-w-3xl mx-auto mb-16'>
              {description}
            </p>
          )}

          <RichText>{content || ''}</RichText>
        </Section>
      </div>

      <Divider />
    </div>
  )
}
