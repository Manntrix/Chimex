import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import DashboardLayout from '@/components/common/DashboardLayout'
import DashboardPagination from '@/components/molecules/DashboardPagination'
import { useState } from 'react'

export default function CareerCenter() {
  const [search, setSearch] = useState('')

  const downloads = [
    {
      name: '2022 Digital Health Most Wired 1',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 2',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 3',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 4',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 5',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 6',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 7',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 8',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 9',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 10',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 11',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 12',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 13',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 14',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 15',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 16',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 17',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
    {
      name: '2022 Digital Health Most Wired 18',
      date: 'Jan 11, 2021 at 01:49 pm',
      link: '#',
    },
  ]

  const [filteredDownloads, setFilteredDownloads] = useState(downloads)

  const filter = (e) => {
    e.preventDefault()

    if (search) {
      setFilteredDownloads(
        downloads.filter((download) =>
          download.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }

  const [page, setPage] = useState(1)

  return (
    <>
      <DashboardLayout>
        <div className='max-w-5xl mx-auto px-4'>
          <h1 className='text-xl font-bold uppercase text-blue-deep mb-8'>
            My Downloads
          </h1>

          <form className='mb-8 flex gap-3' onSubmit={filter}>
            <div className='w-40 relative'>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full pl-2 pr-8 py-1.5 text-sm rounded border-0 bg-white shadow'
                placeholder='Search'
              />

              <Image
                src='/icons/search-black.svg'
                width={16}
                height={16}
                className='absolute top-2 right-2'
              />
            </div>

            <select className='w-32 pl-2 pr-8 py-1.5 text-sm rounded border-0 bg-white shadow'>
              <option>All</option>
            </select>
          </form>

          <table className='w-full'>
            <thead className='border-b'>
              <tr className='uppercase text-xs text-blue-deep'>
                <th className='p-4 text-left'>Filename</th>
                <th>DATE</th>
                <th>Save</th>
              </tr>
            </thead>

            <tbody>
              {filteredDownloads
                .slice(7 * (page - 1), 7 * page)
                .map((download, index) => (
                  <tr key={index} className='text-sm border-b'>
                    <td className='p-4 text-blue-sky'>{download.name}</td>
                    <td className='text-center p-4'>{download.date}</td>
                    <td className='text-center p-4'>
                      <Button type='white' size='sm' href={download.href}>
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className='my-4'>
            <DashboardPagination
              className='pagination-bar'
              currentPage={page}
              totalCount={filteredDownloads.length}
              pageSize={7}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
