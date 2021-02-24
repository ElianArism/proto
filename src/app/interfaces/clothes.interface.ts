import { Sizes, Brand, Type, Img } from './management-crud.interface';

export default interface Clothes {
    img?: Img, 
    name: string, 
    brand: Brand, 
    type: Type, 
    gender: string[], 
    stock: number, 
    sizes: Array<Sizes>, 
    price: number, 
    active?: boolean
}
