import Button from '@/components/atoms/Button'
import RichText from '../RichText'
import { useState } from 'react'
import Section from '@/components/atoms/Section'

export default function DashboardNotification({
  title,
  content,
  collapsable,
  button_text,
  button_link,
}) {
  const [show, setShow] = useState(true)

  return (
    <>
      {show && (
        <Section className='mb-8'>
          <div
            className='border border-blue-dark border-opacity-20 border-dashed px-6 py-6 relative'
            style={{ background: 'rgba(18, 157, 201, 0.14)' }}
          >
            <h1 className='text-xl text-center font-bold text-blue-deep mt-6 mb-4'>
              {title}
            </h1>

            {content && <RichText>{content}</RichText>}

            <div className='text-center'>
              <Button
                type='white'
                href={button_link}
                urlExternal={true}
                size='sm'
              >
                {button_text}
              </Button>
            </div>

            {collapsable && (
              <div className='absolute top-5 right-5'>
                <span
                  onClick={() => setShow(false)}
                  className='text-blue-sky cursor-pointer'
                >
                  Close
                </span>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  )
}
