import getFoundationType from '@/functions/fetch/wordpress/getFoundationType'

export default function FirmType({ typeId }) {
  const { data: type } = getFoundationType(typeId)

  return <span>{type?.name}</span>
}
