import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper';
import key from 'weak-key';
import 'swiper/css';
import { gql } from "@apollo/client";
import MainSlide from '../mainSlide/index';
import styles from './styles/styles.module.scss';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GETSLIDES = gql`
  query($locale: I18NLocaleCode) {
    mainSliders(locale: $locale) {
    data {
      id
      attributes {
        Slider {
          id
          Image {
            data {
              attributes {
                width
                height
                url
              }
            }
          }
          Title
          Text
          ButtonUrl
          ButtonText
        }
      }
    }
  }
  }
`
export default function MainSlider(props) {
  console.log('process', props)
  const { locale } = useRouter();
  const { loading, error, data } = useQuery(GETSLIDES, {
    variables: {
      locale
    }
  });

  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    console.log('error', error)
  }

  const sliders = data.mainSliders.data[0] ? data.mainSliders.data[0].attributes.Slider : [];

  return (
    <div className={styles.slider__container}>
      { sliders.length ? 
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        modules={[Virtual]}
        virtual
        className="hero__slider"
      >
        {sliders.map((item: string[]) => {
          return <SwiperSlide key={key(item)}><MainSlide slideData={item} /></SwiperSlide>
        })}
      </Swiper> : null }
    </div>

  )
}
