import { Container } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useState } from 'react';
import 'swiper/css';
import key from 'weak-key';

interface IGalleryImage {
  attributes: {
    url: string,
    alternativeText: string,
  }
  length?: number
}

export default function ProductSlider({images}:{images: IGalleryImage}) {
  console.log('images', images)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Container height={'100%'}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-product__main"
      >
        { images ? (images as unknown as any[]).map((item:IGalleryImage) => {
          return <SwiperSlide key={key(item)} className={'product__slide'}><img src={`http://localhost:1337${item.attributes.url}`} alt={item.attributes.alternativeText} /></SwiperSlide>
        }) : null}
      </Swiper>
      <Container height={'100px'} pl={0} pr={0} pt={'10px'}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-product__thumbs"
        >
         { images ? (images as unknown as any[]).map((item:IGalleryImage) => {
          return <SwiperSlide key={key(item)} className={'product__thumb'}><img src={`http://localhost:1337${item.attributes.url}`} alt={item.attributes.alternativeText} /></SwiperSlide>
        }) : null}
        </Swiper>
      </Container>
    </Container>
  )
}