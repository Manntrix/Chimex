import Section from '@/components/atoms/Section'
import GravityForms from '@/components/molecules/GravityForms'

export default function Form({
  id,
  title,
  description,
  fields,
  button,
  confirmations,
}) {
  return (
    <>
      <Section classNames='px-4 py-12'>
        <h2 className='text-2xl md:text-4xl font-bold text-center mb-4'>
          {title}
        </h2>

        <p className='text-center max-w-2xl mx-auto mb-8'>{description}</p>

        <GravityForms
          id={id}
          fields={fields}
          button={button}
          confirmations={confirmations}
        />
      </Section>
    </>
  )
}
