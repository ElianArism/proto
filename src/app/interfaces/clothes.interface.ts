export default interface Clothes {
    img: string, 
    name: string, 
    brand: string, 
    type: string, 
    gender: string, 
    stock: number, 
    sizes: Array<Sizes>, 
    price: number
}

export interface Sizes {
    _id: string;
    size: string;
    avaible: boolean;
}