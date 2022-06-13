import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'

export default function TwoColumnCTA({ left, right }) {
  return (
    <div className='grid md:grid-cols-2 gap-8'>
      <div className='py-8'>
        {left?.image && (
          <div className='relative w-40 h-20 mb-8'>
            <Image src={left?.image} fill={true} />
          </div>
        )}

        {left?.description && <p className='mb-8'>{left?.description}</p>}

        <Button
          href={left?.button?.link}
          type='custom'
          className='w-full rounded'
          style={{ background: `${left?.button?.background}` }}
        >
          <div className='flex justify-between items-start gap-2 w-full py-2'>
            <div className='text-left'>
              <h4 className='text-white text-xl font-bold'>
                {left?.button?.title}
              </h4>
              <p className='text-white font-normal'>{left?.button?.subtitle}</p>
            </div>

            <Image
              src={left?.button?.icon}
              width={24}
              height={24}
              className='mt-2'
            />
          </div>
        </Button>
      </div>

      <div className='py-8'>
        {right?.image && (
          <div className='relative w-40 h-20 mb-8'>
            <Image src={right?.image} fill={true} />
          </div>
        )}

        {right?.description && <p className='mb-8'>{right?.description}</p>}

        <Button
          href={right?.button?.link}
          type='custom'
          className='w-full rounded'
          style={{ background: `${right?.button?.background}` }}
        >
          <div className='flex justify-between items-start gap-2 w-full py-2'>
            <div className='text-left'>
              <h4 className='text-white text-xl font-bold'>
                {right?.button?.title}
              </h4>
              <p className='text-white font-normal'>
                {right?.button?.subtitle}
              </p>
            </div>

            <Image
              src={right?.button?.icon}
              width={24}
              height={24}
              className='mt-2'
            />
          </div>
        </Button>
      </div>
    </div>
  )
}
