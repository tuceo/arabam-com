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

export interface CarDetail {
  id: number
  title: string
  location: { cityName: string; townName: string }
  category: { id: number; name: string }
  modelName: string
  price: number
  priceFormatted: string
  dateFormatted: string
  photos: string[]
  properties: { name: string; value: string }[]
  text: string
  userInfo: {
    nameSurname: string
    phoneFormatted: string
  }
}
