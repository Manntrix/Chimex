/* eslint-disable no-inner-declarations */
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import '@/styles/visualcomposer.scss'
import SEO from '../next-seo.config'
import '@/styles/main.scss'
import '../assets/css/js_composer.min.css'
import '../assets/lib/bower/font-awesome/css/all.min.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter()
  const [eventSlider, setEventSlider] = useState(0)
  const [contentSlider, setContentSlider] = useState(0)
  useEffect(() => {
    // advert slider
    let slider = document.getElementsByClassName('adslider')
    if (slider.length > 0) {
      let slideIndex = 0
      showSlides()
      function showSlides() {
        let i
        let slides = document.querySelectorAll('.adslider .gofollow')

        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none'
        }
        slideIndex++
        if (slideIndex > slides.length) {
          slideIndex = 1
        }

        if (slides.length > 0) {
          slides[slideIndex - 1].style.display = 'block'
        }

        setTimeout(showSlides, 2000) // Change image every 2 seconds
      }
    }
    //accordion
    let isAccordion = document.getElementById('chimexaccordion')
    if (isAccordion) {
      var acc = document.getElementsByClassName('accordion')
      var i

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function () {
          this.classList.toggle('active')
          var panel = this.nextElementSibling
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null
          } else {
            panel.style.maxHeight = panel.scrollHeight + 'px'
          }
        })
      }
    }
    //Event slideshow
    let slides = document.getElementsByClassName('eventSlides')

    setEventSlider(slides.length)
    if (eventSlider > 1) {
      let slideIndex = 1
      eventSlides()

      function eventSlides() {
        let i
        let slides = document.getElementsByClassName('eventSlides')
        let dots = document.getElementsByClassName('eventdot')
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none'
        }
        slideIndex++
        if (slideIndex > slides.length) {
          slideIndex = 1
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '')
        }
        slides[slideIndex - 1].style.display = 'block'
        dots[slideIndex - 1].className += ' active'
        setTimeout(eventSlides, 4000)
      }
    }

    //Content slideshow
    let contentslides = document.getElementsByClassName('contentSlides')
    setContentSlider(contentslides.length)
    if (contentSlider > 1) {
      let slideIndex = 1
      contentSlides()

      function contentSlides() {
        let i
        let slides = document.getElementsByClassName('contentSlides')
        let dots = document.getElementsByClassName('contentdot')
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none'
        }
        slideIndex++
        if (slideIndex > slides.length) {
          slideIndex = 1
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '')
        }
        slides[slideIndex - 1].style.display = 'block'
        dots[slideIndex - 1].className += ' active'
        setTimeout(contentSlides, 4000)
      }
    }
  }, [eventSlider, contentSlider, router.pathname])

  return (
    <>
      <DefaultSeo {...SEO} />

      <NextAuthProvider session={session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  )
}
