export interface CarProperty {
  name: string
  value: string
}

export interface Car {
  id: number
  title: string
  location: {
    cityName: string
    townName: string
  }
  category: {
    id: number
    name: string
  }
  modelName: string
  price: number
  priceFormatted: string
  date: string
  dateFormatted: string
  photo: string
  properties: CarProperty[]
}
