import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'

export default function EventTickets({
  anchor,
  title,
  description,
  background_image,
  tickets,
}) {
  return (
    <div id={anchor} className='relative py-16'>
      <div className='absolute top-0 right-0 w-full h-full -z-10'>
        <Image src={background_image} fill={true} cover={true} />
      </div>

      <Section>
        <h2 className='text-6xl font-bold text-white text-center mb-4'>
          {title}
        </h2>

        <p className='text-lg text-white text-center max-w-3xl mx-auto mb-16'>
          {description}
        </p>

        <div className='grid md:grid-cols-3 gap-8 mb-8'>
          {tickets?.map((ticket) => (
            <div key={ticket.name} style={{ padding: '1px' }}>
              <div className='px-6 pt-6 pb-2 w-full bg-white flex flex-col items-start rounded-t'>
                <p className='text-2xl font-bold mb-3'>{ticket.name}</p>

                <p className='mb-3'>{ticket.description}</p>

                <p className='text-3xl font-bold'>${ticket.price}</p>
              </div>

              <div
                className='p-3 relative'
                style={{
                  backgroundImage: 'url(/images/tickets-shape.png)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>

              <div className='px-6 pt-2 pb-6 w-full bg-white flex flex-col items-start rounded-b'>
                <ul className='py-2 mb-3'>
                  {ticket.items.map((item, index) => (
                    <li key={index} className='text-sm mb-1 flex items-start'>
                      <Image
                        src='/icons/check-green.svg'
                        width={15}
                        height={15}
                        className='mr-1.5 flex-shrink-0'
                      />
                      {item.item}
                    </li>
                  ))}
                </ul>

                <Button
                  type='secondary'
                  href={ticket.button_link}
                  icon='/icons/arrow-right-white.svg'
                >
                  {ticket.button_text}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
