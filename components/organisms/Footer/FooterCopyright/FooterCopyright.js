import Link from '@/components/atoms/Link'
import Section from '@/components/atoms/Section'
import { terms } from '@/const/footer'

export default function FooterSocial() {
  return (
    <Section className='pt-4 pb-8'>
      <div className='grid md:grid-cols-2'>
        <div className='text-white text-xs mb-2 md:mb-0'>
          <p className='mb-4 lg:mb-0'>
            © 2022 College of Healthcare Information Management Executives
          </p>
        </div>

        <div className='grid grid-cols-2 gap-2 lg:flex lg:gap-8 lg:justify-end z-10'>
          {terms.items.map((item, index) => (
            <Link key={index} href={item.href} className='text-white text-sm'>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
