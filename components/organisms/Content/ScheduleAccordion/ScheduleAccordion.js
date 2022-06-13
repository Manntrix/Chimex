import Collapse from './Collapse'

export default function ScheduleAccordion({ elements }) {
  return (
    <div className='mt-8 mb-12'>
      {elements.map((element, index) => (
        <Collapse key={index} {...element} defaultExpanded={index === 0} />
      ))}
    </div>
  )
}
