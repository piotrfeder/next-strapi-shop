import {useState, useEffect} from "react";

export default function useImageData(image) {
  const [imageData, setImageData] = useState(null)

  useEffect(() => {
    if (image.data) {
      setImageData(image.data.attributes)
    }
  }, [image])
  return imageData;
}
