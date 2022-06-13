import Button from '@/components/atoms/Button'
import DashboardLayout from '@/components/common/DashboardLayout'
import dateDiff from '@/functions/dateDiff'
import getJobs from '@/functions/fetch/wordpress/getJobs'
import { useState, useEffect } from 'react'

export default function Jobs() {
  const { data: jobs } = getJobs()

  const [searchText, setSearchText] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const [types, setTypes] = useState([
    'contract',
    'freelance',
    'full_time',
    'part_time',
    'remote',
    'temporary',
  ])
  const [compensations, setCompensations] = useState(['sm', 'md', 'lg', 'xl'])

  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    setFilteredJobs(jobs)
  }, [jobs])

  useEffect(() => {
    let filtered = jobs

    filtered = filtered?.filter((job) =>
      job.acf.type?.some((t) => types.includes(t))
    )

    filtered = filtered?.filter((job) =>
      compensations.includes(job.acf.compensation)
    )

    setFilteredJobs(filtered)
  }, [types, compensations])

  const handleSetTypes = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t !== type))
    } else {
      setTypes([...types, type])
    }
  }

  const handleSetCompensation = (compensation) => {
    if (compensations.includes(compensation)) {
      setCompensations(compensations.filter((c) => c !== compensation))
    } else {
      setCompensations([...compensations, compensation])
    }
  }

  const filter = (e) => {
    e.preventDefault()

    let filtered = jobs

    if (searchText) {
      filtered = filtered.filter((job) =>
        job.title.rendered?.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (searchLocation) {
      filtered = filtered.filter((job) =>
        job.acf.full_address
          ?.toLowerCase()
          .includes(searchLocation.toLowerCase())
      )
    }

    setFilteredJobs(filtered)

    setTypes([
      'contract',
      'freelance',
      'full_time',
      'part_time',
      'remote',
      'temporary',
    ])
    setCompensations(['sm', 'md', 'lg', 'xl'])
  }

  return (
    <>
      <DashboardLayout>
        <div className='max-w-5xl mx-auto w-full px-4'>
          <h1 className='text-xl font-bold text-blue-deep mb-8 uppercase'>
            JOB BOARD
          </h1>

          <div className='flex flex-col-reverse md:flex-row gap-8 justify-between'>
            <div className='w-full'>
              <form className='flex flex-col md:flex-row gap-2 md:items-end mb-8'>
                <div></div>

                <div>
                  <label className='block text-sm'>
                    Job Title / Description
                  </label>
                  <input
                    type='text'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
                  />
                </div>

                <div>
                  <label className='block text-sm'>Location</label>
                  <input
                    type='text'
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
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

              <div className='w-full'>
                <p className='text-sm font-bold mb-4'>{`Results (${filteredJobs?.length}/${jobs?.length})`}</p>

                {filteredJobs?.map((job, index) => (
                  <div
                    key={index}
                    className='bg-zinc-100 p-3 mb-4 w-full flex flex-col md:flex-row justify-between gap-4'
                  >
                    <div>
                      {job.acf.featured ? (
                        <p className='text-xs text-gray-600 mb-3'>Featured</p>
                      ) : (
                        <div className='h-5'></div>
                      )}

                      <p className='font-bold mb-2'>{job.title.rendered}</p>

                      <div className='flex gap-1'>
                        {job.acf.type?.map((t, index) => (
                          <span
                            key={index}
                            className='bg-blue-sky px-1 text-xs text-white capitalize'
                          >
                            {t.replace('_', ' ')}
                          </span>
                        ))}
                        <span className='text-xs mx-1'>• CHIME</span>
                      </div>
                    </div>

                    <div className='flex flex-col items-end'>
                      <p className='text-sm font-bold text-gray-600 mb-3'>
                        {job.acf.full_address}
                      </p>

                      <p className='text-xs text-gray-500 mb-2'>
                        Posted {dateDiff(new Date(), new Date(job.date))}
                      </p>

                      <div className='flex gap-1'>
                        <Button
                          type='white'
                          size='sm'
                          href={`/dashboard/jobs/${job.slug}`}
                        >
                          View Job
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='w-full md:w-48 flex-shrink-0'>
              <div className='border border-blue-sky p-6 bg-white rounded mb-8'>
                <h3 className='block text-sm font-bold text-blue-deep mb-6'>
                  Employment Type
                </h3>

                {[
                  'contract',
                  'freelance',
                  'full_time',
                  'part_time',
                  'remote',
                  'temporary',
                ].map((type, index) => (
                  <label
                    key={index}
                    className='text-sm capitalize flex items-center mb-4'
                  >
                    <input
                      name='type'
                      type='checkbox'
                      checked={types.includes(type)}
                      onChange={() => handleSetTypes(type)}
                      className='mr-2'
                    />

                    <span>{type.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>

              <div className='border border-blue-sky p-6 bg-white rounded mb-8'>
                <h3 className='block text-sm font-bold text-blue-deep mb-6'>
                  Compensation
                </h3>

                {['sm', 'md', 'lg', 'xl'].map((compensation, index) => (
                  <label
                    key={index}
                    className='text-sm capitalize flex items-center mb-4'
                  >
                    <input
                      name='type'
                      type='checkbox'
                      checked={compensations.includes(compensation)}
                      onChange={() => handleSetCompensation(compensation)}
                      className='mr-2'
                    />

                    <span>{compensation.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
