import Link from '@/components/atoms/Link'
import getSettings from '@/functions/fetch/wordpress/getSettings'
import randomNumber from '@/functions/randomNumber'

export default function Announcement() {
  const { data: settings } = getSettings()

  const announcement =
    settings?.acf?.announcements?.length > 0
      ? settings?.acf?.announcements[
          randomNumber(0, settings?.acf?.announcements.length)
        ]
      : {}

  return (
    <>
      <div className='text-white lg:ml-12 hidden lg:block'>
        {announcement.text}{' '}
        {announcement.link && (
          <Link href={announcement?.link} className='underline'>
            {announcement?.link_text}
          </Link>
        )}
      </div>
    </>
  )
}
