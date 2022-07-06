export interface Format {
  attributes: {
    Format: string,
    Price: number,
  }
}

export interface Product {
  MainPhoto: {
    data: {
      attributes: {
        url: string
      }
    }
  }
  price?: number,
  Title: string,
  id: string,
  SEO: Array<string>,
  formats: {
    data: Array<
      Format 
    >
  }
}