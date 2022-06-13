export default function typography({ markdown, text }) {
  switch (markdown) {
    case 'h1':
      return <h1 className='text-7xl font-bold mb-4'>{text}</h1>

    case 'h2':
      return <h2 className='text-5xl font-bold mb-4'>{text}</h2>

    case 'h3':
      return <h3 className='text-3xl font-bold mb-4'>{text}</h3>

    case 'h4':
      return <h4 className='text-xl font-bold mb-4'>{text}</h4>

    case 'h5':
      return <h5 className='text-lg font-semibold mb-4'>{text}</h5>

    case 'h6':
      return <h6 className='text-sm font-bold mb-4'>{text}</h6>

    case 'blockquote':
      return (
        <blockquote className='border-l-8 border-green-bright pl-6 font-bold mb-4'>
          {text}
        </blockquote>
      )

    default:
      return <p className='font mb-4'>{text}</p>
  }
}
