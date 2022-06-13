import Divider from '@/components/atoms/Divider'
import Loading from '@/components/atoms/Loading'
import Section from '@/components/atoms/Section'
import Layout from '@/components/common/Layout'
import PageHero from '@/components/organisms/PageHero'
import parse from 'html-react-parser'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import Router, { useRouter } from 'next/router'

import Content from '@/components/organisms/Content'

export default function Page({ page }) {
  useEffect(() => {
    var internalLink = document.getElementsByClassName('internal-link')
    if (internalLink.length > 0) {
      var i
      for (i = 0; i < internalLink.length; i++) {
        internalLink[i].onclick = function () {
          var href = this.childNodes[0].href
          var hrefSplit = href.split('/')
          Router.push(`/${hrefSplit[3]}`)
        }
      }
    }
  }, [])
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Section>
          <Loading />
        </Section>
      </Layout>
    )
  }

  // const breadcrumbs = parentPage
  //   ? [
  //       {
  //         text: 'Home',
  //         link: '/',
  //       },
  //       {
  //         text: unEntry(parentPage?.title?.rendered),
  //         link: parentPage?.title?.slug,
  //       },
  //       {
  //         text: unEntry(page?.title?.rendered),
  //       },
  //     ]
  //   : [
  //       {
  //         text: 'Home',
  //         link: '/',
  //       },
  //       {
  //         text: unEntry(page?.title?.rendered),
  //       },
  //     ]

  return (
    <>
      <NextSeo
        {...page?.yoast_head_json}
        description={page?.yoast_head_json?.og_description}
      />

      <Layout>
        {/* <PageHero
          title={page?.title?.rendered}
          background_image={page?.acf?.hero_image}
        /> */}

        {parse(page?.content?.rendered)}

        <Divider width={12} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  // const slug = params.slug[params.slug.length - 1]
  const slug = 'individual-memberships-2'

  /**
   * Page Content
   */
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_REST_URL}/wp/v2/pages/?slug=individual-memberships-2`
  )

  const pageData = await pageRes.json()

  const page = pageData?.length > 0 ? pageData[0] : null

  // if (!page) {
  //   return {
  //     notFound: true,
  //   }
  // }

  /**
   * Parent Page
   */

  return {
    props: {
      page,
      pageData,
    },
    revalidate: 10,
  }
}
