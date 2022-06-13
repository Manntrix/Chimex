import Divider from '@/components/atoms/Divider'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import CTA from './CTA'
import PageSiblings from './PageSiblings'
import Post from './Post'
import PostList from './PostList'
import Tags from './Tags'
import Topics from './Topics'

export default function Sidebar({ sidebar, slug, parentPage }) {
  return (
    <>
      {parentPage && <PageSiblings slug={slug} parentPage={parentPage} />}

      {sidebar.map((element, index) => {
        switch (element.acf_fc_layout) {
          case 'divider':
            return (
              <Divider key={index} width={element.width} className='my-8' />
            )

          case 'ad':
            return (
              <Link key={index} href={element.link} urlExternal={true}>
                <Image
                  src={element.image}
                  width={parseInt(element.width)}
                  height={parseInt(element.height)}
                  className='max-w-full'
                />
              </Link>
            )
          case 'post':
            return <Post key={index} id={element.post} />

          case 'post_list':
            return (
              <PostList
                key={index}
                title={element.title}
                posts={element.posts}
              />
            )

          case 'topic_highlights':
            return (
              <Topics
                key={index}
                title={element.title}
                topics={element.topics}
              />
            )

          case 'trending_tags':
            return (
              <Tags key={index} title={element.title} tags={element.tags} />
            )

          case 'cta':
            return <CTA key={index} {...element} />

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
