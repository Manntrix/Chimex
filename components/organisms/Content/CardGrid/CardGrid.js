import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function IconGrid({ cards }) {
  return (
    <div className='grid md:grid-cols-3 gap-8 my-12'>
      {cards?.map((card, index) => (
        <div
          key={index}
          className='px-4 py-8 bg-gray-100 flex flex-col justify-between'
        >
          <div>
            <h4 className='text-2xl font-bold mb-4'>{card.title}</h4>

            <p className='mb-4'>{card.description}</p>

            <hr />
          </div>

          <Link href={card.button_link} className='font-bold mt-4 flex gap-2'>
            {card.button_text}{' '}
            <Image src='/icons/arrow-right-blue.svg' width={16} height={16} />
          </Link>
        </div>
      ))}
    </div>
  )
}
