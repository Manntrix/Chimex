import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import DashboardLayout from '@/components/common/DashboardLayout'
import FirmType from '@/components/molecules/Meta/FirmType'
import Media from '@/components/molecules/Meta/Media'
import getFoundations from '@/functions/fetch/wordpress/getFoundations'
import getFoundationSolutions from '@/functions/fetch/wordpress/getFoundationSolutions'
import unEntry from '@/functions/unEntry'
import classNames from 'classnames'
import { useState, useEffect } from 'react'

export default function CareerCenter() {
  const { data: foundations } = getFoundations()
  const { data: solutions } = getFoundationSolutions()

  const [filteredFoundations, setFilteredFoundations] = useState([])

  const [solution, setSolution] = useState('')
  const [term, setTerm] = useState('')

  useEffect(() => {
    setFilteredFoundations(foundations)
    setSolution(solutions?.length > 0 ? solutions[0].id : '')
  }, [foundations, solutions])

  const filter = (e) => {
    e.preventDefault()

    let filtered = foundations

    if (solution) {
      filtered = filtered.filter((foundation) =>
        foundation['service-type'].includes(parseInt(solution))
      )
    }

    if (term) {
      filtered = filtered.filter((foundation) =>
        foundation.title.rendered?.toLowerCase().includes(term.toLowerCase())
      )
    }

    setFilteredFoundations(filtered)
  }

  return (
    <>
      <DashboardLayout>
        <div className='max-w-5xl mx-auto w-full px-4'>
          <h1 className='text-xl font-bold text-blue-deep mb-8 uppercase'>
            FOUNDATION Directory
          </h1>

          <form className='flex flex-col md:flex-row gap-2 md:items-end mb-8'>
            <div className='w-52'>
              <label className='block text-sm'>Select Solutions</label>
              <select
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              >
                {solutions?.map((s, index) => (
                  <option key={index} value={s.id}>
                    {unEntry(s.name)}
                  </option>
                ))}
              </select>
            </div>

            <div className='w-48'>
              <label className='block text-sm'>Search Terms</label>
              <input
                type='text'
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              />
            </div>

            <div className='w-32'>
              <Button
                type='primary'
                onClick={filter}
                size='sm'
                className='w-full'
              >
                <span className='text-sm font-normal'>Search</span>
              </Button>
            </div>
          </form>

          <table className='w-full max-w-full overflow-auto'>
            {filteredFoundations?.map((foundation, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 && 'bg-zinc-100',
                  'max-w-full'
                )}
              >
                <td className='px-4 py-4'>
                  <div className='w-40 h-40'>
                    <Media mediaId={foundation.featured_media} />
                  </div>
                </td>

                <td className='px-4 py-4'>
                  <Link
                    href={`/dashboard/foundation-directory/${foundation.slug}`}
                    className='text-xl font-bold text-blue-sky mb-2 hover:underline'
                  >
                    {foundation.title?.rendered}
                  </Link>

                  <p className='text-sm'>
                    <FirmType typeId={foundation['firm-type'][0]} />
                  </p>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </DashboardLayout>
    </>
  )
}
