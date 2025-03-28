/**
 * {
    "name": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "value": 29,
    "availableQuantity": 10,
    "description": "Produto novo, bem acabado, alegria para colecionadores",
    "features": [{
        "name": "Fabricante",
        "description": "Iron Studios"
    },{
        "name": "material",
        "description": "Plástico"
    },{
        "name": "Child",
        "description": "More than 5 years"
    }],
    "images": [{
        "url": "https://i.imgur.com/dwDZICq.jpg",
        "description": "Imagem do Homem Aranha"
    }],
    "category": "Conservation",
    "createdAt": "2022-10-12T14:22:53.496Z",
    "updatedAt": "2022-10-12T14:22:53.496Z"
   }
    */

import { Type } from "class-transformer";
import { ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
    Min,
    ValidateNested
} from "class-validator";
import { ProductEntity } from "../product.entity";
import { OrderItemEntity } from "src/modules/order/order-item.entity";

export class FeaturesProductDto {
    
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    product: ProductEntity;
}

export class ImageProductDto {
    
    id: string;

    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    product: ProductEntity;
}

export class CreateProductDto {

    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1)
    value: number

    @IsNumber()
    @Min(0)
    availableQuantity: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => FeaturesProductDto)
    features: FeaturesProductDto[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImageProductDto)
    images: ImageProductDto[];

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsDateString()
    createdAt: string;

    @IsDateString()
    updatedAt: string;

    deletedAt: string;

    orderItems: OrderItemEntity[]
}