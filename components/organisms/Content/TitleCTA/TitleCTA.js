import Button from '@/components/atoms/Button'
import Section from '@/components/atoms/Section'

export default function TitleCTA({ title, button_link, button_text }) {
  return (
    <Section className='py-8 md:py-16'>
      <div className='flex flex-col md:flex-row justify-between border-b'>
        <h2 className='text-4xl lg:text-6xl font-bold mb-4'>{title}</h2>

        <div className='mb-12 lg:mb-4'>
          <Button
            href={button_link}
            type='primary'
            icon='/icons/arrow-right-white.svg'
          >
            {button_text}
          </Button>
        </div>
      </div>
    </Section>
  )
}
