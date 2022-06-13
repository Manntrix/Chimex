import styles from './FooterSubscribe.module.scss'
import Logo from '@/components/molecules/Logo'
import Section from '@/components/atoms/Section'
import Subscribe from '@/components/molecules/Subscribe'
import Social from '@/components/molecules/Social'

export default function FooterSubscribe() {
  return (
    <div className='pt-6'>
      <Section className='py-8 md:py-16'>
        <div className={styles.root}>
          <div className='col-span-3 flex items-center'>
            <Logo />
          </div>

          <div className='col-span-4 px-2 mt-4 md:px-4 flex items-center'>
            <Social />
          </div>

          <div className='col-span-5 px-2 md:px-4 flex items-center'>
            <Subscribe />
          </div>
        </div>
      </Section>
    </div>
  )
}
