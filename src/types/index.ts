export interface ProductGuitar {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
}

export interface CartItem extends ProductGuitar {
    quantity: number;
}

export type GuitarID = ProductGuitar["id"]