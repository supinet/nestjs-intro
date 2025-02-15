export class ListFeaturesProductDto {
    name: string;
    description: string;
}

export class ListImageProductDto {
    url: string;
    description: string;
}

export class ListProductDto {
    id: string;
    userId: string;
    name: string;
    value: number;
    quantity: number;
    description: string;
    category: string;
    features: ListFeaturesProductDto[];
    images: ListImageProductDto[];
}