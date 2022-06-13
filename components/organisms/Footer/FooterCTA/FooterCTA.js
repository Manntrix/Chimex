import Button from '@/components/atoms/Button'
import Section from '@/components/atoms/Section'
import Background from '@/components/molecules/Background'

export default function FooterCTA() {
  return (
    <div className='py-6 relative'>
      <Background image='/images/footer-cta-bg.jpg' overlay='light' />

      <Section className='py-8 md:py-16'>
        <div className='max-w-lg'>
          <h2 className='text-5xl md:text-7xl font-bold text-white mb-6'>
            Don’t wait
            <br />
            Join us today
          </h2>

          <p className='text-lg font-normal text-white mb-10'>
            Be part of the largest network of healthcare IT professionals.
          </p>

          <Button
            href='/membership'
            type='secondary'
            icon='/icons/arrow-right-white.svg'
          >
            Explore Memberships
          </Button>
        </div>
      </Section>
    </div>
  )
}
