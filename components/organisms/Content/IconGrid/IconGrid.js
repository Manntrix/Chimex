import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import classNames from 'classnames'

export default function IconGrid({
  title,
  description,
  icons,
  cta_text,
  cta_link,
}) {
  return (
    <div>
      <h3 className='text-3xl font-bold mb-4'>{title}</h3>

      <p className='mb-8'>{description}</p>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
        {icons?.map((icon, index) => (
          <div
            key={index}
            className={classNames(
              'px-4 py-8 flex flex-col',
              icon.icon_position === 'left' ? 'items-start' : 'items-center',
              icon.show_border && 'border'
            )}
          >
            <Image src={icon.icon} width={70} height={70} className='mb-2' />
            <p className='text-xl font-bold h-12 text-center'>{icon.text}</p>

            {icon.list?.length > 0 && (
              <ul className='mt-6'>
                {icon.list?.map((item, index) => (
                  <li key={index} className='text-sm mb-1 flex items-start'>
                    <Image
                      src='/icons/check-green.svg'
                      width={15}
                      height={15}
                      className='mr-1.5 flex-shrink-0'
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <Link href={cta_link} className='font-bold underline'>
        {cta_text}
        {' >'}
      </Link>
    </div>
  )
}
