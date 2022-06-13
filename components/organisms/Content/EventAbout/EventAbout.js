import Image from '@/components/atoms/Image'
import Section from '@/components/atoms/Section'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import RichText from '../RichText'
import Divider from '@/components/atoms/Divider'

export default function EventAbout({
  anchor,
  title,
  description,
  information,
  video,
  fw,
}) {
  const [videoPlay, setVideoPlay] = useState(false)

  return (
    <>
      {fw ? (
        <>
          <div id={anchor} className='relative py-16'>
            <div
              className='absolute -z-10 w-full h-full top-0 left-0'
              style={{
                background:
                  'linear-gradient(180deg, rgba(137, 187, 223, 0) 0%, rgba(43, 135, 200, 0.12) 100%)',
              }}
            ></div>

            <Section>
              <h2 className='text-3xl md:text-5xl font-bold text-center max-w-2xl mx-auto mb-8'>
                {title}
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div className='relative'>
                  {video?.file && (
                    <>
                      <div className='flex justify-end px-12'>
                        <Image
                          src={video?.background_image}
                          width={parseInt(video?.background_image_width)}
                          height={parseInt(video?.background_image_height)}
                        />
                      </div>

                      <div
                        className='relative mt-16 md:mt-0 md:absolute bottom-10 left-0 cursor-pointer'
                        onClick={() => setVideoPlay(true)}
                      >
                        <Image
                          src={video?.placeholder_image}
                          width={380}
                          height={220}
                        />

                        <div
                          className='absolute z-10'
                          style={{ top: '50px', left: '130px' }}
                        >
                          <Image
                            src='/icons/play-white.svg'
                            width={120}
                            height={120}
                          />
                        </div>
                      </div>

                      {videoPlay && (
                        <div className='fixed w-full h-full top-0 left-0 bg-black bg-opacity-60 backdrop-blur flex items-center justify-center z-50'>
                          <div className='hidden md:block'>
                            <ReactPlayer
                              url={video?.file}
                              controls={true}
                              width={920}
                              height={536}
                              light={video?.placeholder_image}
                              playIcon={
                                <Image
                                  src='/icons/play-white.svg'
                                  width={120}
                                  height={120}
                                />
                              }
                              auto
                            />
                          </div>

                          <div className='md:hidden'>
                            <ReactPlayer
                              url={video?.file}
                              controls={true}
                              width={400}
                              height={240}
                              light={video?.placeholder_image}
                              playIcon={
                                <Image
                                  src='/icons/play-white.svg'
                                  width={120}
                                  height={120}
                                />
                              }
                              auto
                            />
                          </div>

                          <div
                            className='absolute top-10 right-10 text-white text-7xl cursor-pointer'
                            onClick={() => setVideoPlay(false)}
                          >
                            x
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <RichText>{description}</RichText>
              </div>
            </Section>
          </div>

          <Section className='py-12'>
            <div className='grid md:grid-cols-3'>
              <div className='md:border-r border-gray-300'>
                <p className='text-7xl text-center font-bold'>
                  {information.attendees}
                </p>

                <p className='text-lg text-center'>Attendees</p>
              </div>

              <div className='md:border-r border-gray-300'>
                <p className='text-7xl text-center font-bold'>
                  {information.sponsors}
                </p>

                <p className='text-lg text-center'>Sponsors</p>
              </div>

              <div className=''>
                <p className='text-7xl text-center font-bold'>
                  {information.speakers}
                </p>

                <p className='text-lg text-center'>Speakers</p>
              </div>
            </div>
          </Section>
        </>
      ) : (
        <>
          <div id={anchor} className='relative py-8'>
            <h2 className='text-2xl font-bold mb-4'>{title}</h2>

            {description && <RichText>{description}</RichText>}
          </div>

          <Divider />
        </>
      )}
    </>
  )
}
