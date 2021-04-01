import { Sizes, Brand, Type, Img } from './management-crud.interface';

export default interface Clothes {
    _id?: string;
    img?: Img;
    name: string;
    brand: Brand;
    type: Type;
    gender: string[];
    sizes: any[];
    price: number;
    active?: boolean;
}
