import cn from 'classnames'

export default function LineDivider({ className }) {
  return (
    <div
      className={cn(
        'h-0.5 bg-gradient-to-r from-green-bright to-blue-turquoise',
        className
      )}
    ></div>
  )
}
