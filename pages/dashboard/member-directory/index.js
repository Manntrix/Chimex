import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import DashboardLayout from '@/components/common/DashboardLayout'
import getMembers from '@/functions/fetch/wordpress/getMembers'
import classNames from 'classnames'
import { useState, useEffect } from 'react'

export default function CareerCenter() {
  const { data: members } = getMembers()

  const [filteredMembers, setFilteredMembers] = useState([])

  useEffect(() => {
    setFilteredMembers(members)
  }, [members])

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const filter = (e) => {
    e.preventDefault()

    let filtered = members

    if (first_name) {
      filtered = filtered.filter((member) =>
        member.acf.first_name?.toLowerCase().includes(first_name.toLowerCase())
      )
    }
    if (last_name) {
      filtered = filtered.filter((member) =>
        member.acf.last_name?.toLowerCase().includes(last_name.toLowerCase())
      )
    }
    if (company) {
      filtered = filtered.filter((member) =>
        member.acf.company?.toLowerCase().includes(company.toLowerCase())
      )
    }
    if (city) {
      filtered = filtered.filter((member) =>
        member.acf.city?.toLowerCase().includes(city.toLowerCase())
      )
    }
    if (state) {
      filtered = filtered.filter((member) =>
        member.acf.state?.toLowerCase().includes(state.toLowerCase())
      )
    }

    setFilteredMembers(filtered)
  }

  return (
    <>
      <DashboardLayout>
        <div className='max-w-5xl mx-auto w-full overflow-auto px-4'>
          <h1 className='text-xl font-bold text-blue-deep mb-8 uppercase'>
            Member Directory
          </h1>

          <form className='flex flex-col md:flex-row gap-2 justify-between md:items-end mb-8'>
            <div className='w-36'>
              <label className='block text-sm'>First Name</label>
              <input
                type='text'
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              />
            </div>

            <div className='w-36'>
              <label className='block text-sm'>Last Name</label>
              <input
                type='text'
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              />
            </div>

            <div className='w-36'>
              <label className='block text-sm'>Company</label>
              <input
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              />
            </div>

            <div className='w-36'>
              <label className='block text-sm'>City</label>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='rounded border border-gray-400 px-3 py-1.5 text-sm w-full'
              />
            </div>

            <div className='w-36'>
              <label className='block text-sm'>State</label>
              <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
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

            <div className='w-40'>
              <Button type='white' size='sm' className='w-full'>
                <span className='text-sm font-normal'>Download List</span>
              </Button>
            </div>
          </form>

          <table className='w-full max-w-full overflow-auto'>
            {filteredMembers?.map((member, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 && 'bg-zinc-100',
                  'max-w-full'
                )}
              >
                <td className='w-1/3 px-4 py-4 overflow-auto'>
                  <Link
                    href={`/dashboard/member-directory/${member.slug}`}
                    className='text-sm font-bold mb-1 hover:underline'
                  >
                    {member.acf?.first_name} {member.acf?.last_name}
                  </Link>
                  <p className='text-sm'>{member.acf?.position}</p>
                </td>

                <td className='w-1/3 px-4 py-4 overflow-auto'>
                  <p className='text-sm mb-1'>
                    {member.acf?.address?.street_1}
                  </p>
                  <p className='text-sm mb-1'>
                    {member.acf?.address?.street_2}
                  </p>
                  <p className='text-sm mb-1'>
                    {member.acf?.address?.city}, {member.acf?.address?.state}{' '}
                    {member.acf?.address?.zip}, {member.acf?.address?.country}
                  </p>
                </td>

                <td className='w-1/3 px-4 py-4 overflow-auto'>
                  <p className='text-smmb-1'>{member.acf?.contact_email}</p>
                  <p className='text-sm'>{member.acf?.contact_phone}</p>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </DashboardLayout>
    </>
  )
}
