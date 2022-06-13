import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import RichText from '@/components/organisms/Content/RichText'
import Accordion from './Accordion'
import Ad from './Ad'
import CardCarousel from './CardCarousel'
import CardGrid from './CardGrid'
import CustomEventsHighlight from './CustomEventsHighlight'
import CustomEventsOverview from './CustomEventsOverview'
import CustomPostsGrid from './CustomPostsGrid'
import DashboardNotification from './DashboardNotification'
import EventAbout from './EventAbout'
import EventBenefits from './EventBenefits'
import EventCustom from './EventCustom'
import EventHotel from './EventHotel'
import EventSchedule from './EventSchedule'
import EventTickets from './EventTickets'
import Form from './Form'
import IconGrid from './IconGrid'
import List from './List'
import ScheduleAccordion from './ScheduleAccordion'
import ThreeColumnEvents from './ThreeColumnEvents'
import ThreeColumnPosts from './ThreeColumnPosts'
import TitleCTA from './TitleCTA'
import TwoColumnCTA from './TwoColumnCTA'
import Typography from './Typography'
import Widget from './Widget'

export default function Content({ elements, fw = true }) {
  return (
    <>
      {elements?.map((element, index) => {
        switch (element.acf_fc_layout) {
          case 'divider':
            return (
              <Divider
                key={index}
                width={element.width}
                space={element.space}
              />
            )

          case 'typography':
            return (
              <Typography
                key={index}
                markdown={element.markdown}
                text={element.text}
              />
            )

          case 'widget':
            return <Widget key={index} {...element} />

          case 'ad':
            return <Ad key={index} {...element} />

          case 'accordion':
            return <Accordion key={index} elements={element.elements} />

          case 'form':
            return <Form key={index} {...element.form} />

          case 'schedule_accordion':
            return <ScheduleAccordion key={index} elements={element.elements} />

          case 'list':
            return <List key={index} items={element.items} />

          case 'rich_text':
            return <RichText key={index}>{element.content}</RichText>

          case 'button':
            return (
              <Button href={element.link} icon={element.icon} type='secondary'>
                {element.text}
              </Button>
            )

          case '2_column_cta':
            return <TwoColumnCTA key={index} {...element} />

          case 'icon_grid':
            return <IconGrid key={index} {...element} />

          case 'card_grid':
            return <CardGrid key={index} {...element} />

          case 'card_carousel':
            return <CardCarousel key={index} {...element} />

          case '2_column_rich_text':
            return (
              <div key={index} className='grid md:grid-cols-2 gap-3'>
                <RichText>{element.left}</RichText>

                <RichText>{element.right}</RichText>
              </div>
            )

          case 'custom_3_column_ctas':
            return (
              <ThreeColumnPosts
                key={index}
                top={element.custom_position}
                {...element}
              />
            )

          case 'custom_title_cta':
            return <TitleCTA key={index} {...element} />

          case 'custom_posts_grid':
            return <CustomPostsGrid key={index} {...element} />

          case 'custom_events_overview':
            return <CustomEventsOverview key={index} {...element} />

          case 'custom_event_highlight':
            return <CustomEventsHighlight key={index} {...element} />

          case 'custom_events_grid':
            return (
              <ThreeColumnEvents
                key={index}
                gap={element.gap}
                {...element.columns}
              />
            )

          case 'event_section_title':
            return (
              <h3
                key={index}
                id={element.anchor}
                className='text-3xl font-bold mb-4'
              >
                {element.title}
              </h3>
            )

          case 'about':
            return <EventAbout key={index} {...element} fw={fw} />

          case 'benefits':
            return <EventBenefits key={index} {...element} />

          case 'schedule':
            return <EventSchedule key={index} {...element} fw={fw} />

          case 'tickets':
            return <EventTickets key={index} {...element} />

          case 'hotel':
            return <EventHotel key={index} {...element} fw={fw} />

          case 'custom':
            return <EventCustom key={index} {...element} />

          case 'dashboard_notification':
            return <DashboardNotification key={index} {...element} />

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
