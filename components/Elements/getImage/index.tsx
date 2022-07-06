import { ImageConfig } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

interface IImage {
  config: Readonly<ImageConfig>,
  quality?: any,
  src: string ,
  width: number,
}

interface ImageData {
  data?:  {
    attributes: {
      url: string
    }
  }
  attributes?: {
    url: string
  }
  url?:string,
  alternativeText?:string
} 
interface Props {
  imageData: ImageData
}

const myLoader = (imageData: IImage) => {
  return `http://localhost:1337${imageData.src}.webp`;
}


export default function GetImage({ imageData }: Props) {
  console.log('getImage', imageData)
  return (
    <Image
      loader={myLoader}
      src={imageData.data ? imageData.data.attributes.url : imageData.attributes ? imageData.attributes.url : ""}
      layout="fill"
      alt=""
    />
  )
}