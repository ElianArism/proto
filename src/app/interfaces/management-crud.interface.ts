export interface Sizes {
    _id: string;
    size: string;
    avaible: boolean;
    opAvailable?: boolean;
    temporalStock?: number;
}

export interface Brand {
    _id: string;
    name: string;
    active?: boolean;
}

export interface Type {
    _id: string;
    type: string;
    active?: boolean;
}

export interface Img {
    public_id: string; 
    path: string;
}