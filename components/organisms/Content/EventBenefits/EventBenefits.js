import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'

export default function EventBenefits({ anchor, title, description, items }) {
  return (
    <div id={anchor} className='relative py-16'>
      <div className='absolute w-full h-full top-0 left-0 bg-blue-deep -z-20'></div>
      <div className='absolute top-0 right-0 w-full h-full'>
        <Image src='/images/post-hero-shape.svg' fill={true} cover={true} />
      </div>

      <Section>
        <h2 className='text-6xl font-bold text-white text-center mb-4'>
          {title}
        </h2>

        <p className='text-lg text-white text-center max-w-3xl mx-auto mb-16'>
          {description}
        </p>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8'>
          {items?.map((item, index) => (
            <div
              key={index}
              className='bg-gradient-to-b from-green-bright to-blue-turquoise'
              style={{ padding: '1px' }}
            >
              <div className='p-6 w-full h-full bg-blue-deep flex flex-col items-start'>
                <Image
                  src={item.icon}
                  width={80}
                  height={80}
                  className='mb-4'
                />

                <p className='text-2xl font-bold text-white mb-3'>
                  {item.name}
                </p>

                <p className='text-white mb-3'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
