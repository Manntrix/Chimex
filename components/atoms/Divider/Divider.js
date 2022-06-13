import cn from 'classnames'

export default function Divider({ width, space = 0, className }) {
  return (
    <div
      className={cn('relative -z-10', className)}
      style={
        space > 0
          ? { marginTop: `${space}rem`, marginBottom: `${space}rem` }
          : {}
      }
    >
      <div
        className='bg-gradient-to-r from-green-tea to-blue-turquoise'
        style={width ? { height: `${width}px` } : { height: '2px' }}
      ></div>
    </div>
  )
}
