import Button from '@/components/atoms/Button'

export default function CTA({ title, subtitle, button_text, button_link }) {
  return (
    <div className='relative mb-12'>
      <h5 className='text-lg font-bold mb-3'>{title}</h5>

      <p className='mb-4'>{subtitle}</p>

      <Button href={button_link} icon='/icons/arrow-right-white.svg'>
        {button_text}
      </Button>
    </div>
  )
}
