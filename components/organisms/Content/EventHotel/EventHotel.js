import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import classNames from 'classnames'
import RichText from '../RichText'

export default function EventHotel({
  anchor,
  title,
  description,
  image,
  information,
  content,
  fw,
}) {
  return (
    <>
      <div
        id={anchor}
        className={classNames('relative', fw ? 'py-16' : 'py-8')}
      >
        {fw && (
          <div
            className='absolute -z-10 w-full h-full top-0 left-0'
            style={{
              background:
                'linear-gradient(180deg, rgba(137, 187, 223, 0) 0%, rgba(43, 135, 200, 0.12) 100%)',
            }}
          ></div>
        )}

        <Section>
          {fw ? (
            <>
              <h2 className='text-6xl text-center font-bold mb-4'>{title}</h2>

              {description && (
                <p className='text-lg text-center max-w-3xl mx-auto mb-16'>
                  {description}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-4'>{title}</h2>

              {description && <p className='mb-4'>{description}</p>}
            </>
          )}

          <div className='grid md:grid-cols-12 gap-12 mb-8 w-full'>
            <div
              className={classNames(
                'md:col-span-7 relative mb-6',
                fw ? 'h-52 md:h-96' : 'h-64'
              )}
            >
              <Image src={image} fill={true} />
            </div>

            <div className='md:col-span-5'>
              <RichText>{information.address || ''}</RichText>

              {information?.button_link && (
                <Button
                  type='secondary'
                  href={information.button_link}
                  icon='/icons/arrow-right-white.svg'
                  className='mb-10'
                >
                  {information.button_text}
                </Button>
              )}

              <RichText>{information.features || ''}</RichText>
            </div>
          </div>

          <div>
            <RichText>{content || ''}</RichText>
          </div>
        </Section>
      </div>

      {!fw && <Divider />}
    </>
  )
}
