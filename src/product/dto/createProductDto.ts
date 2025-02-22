/**
 * {
    "name": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "value": 70.0,
    "quantity": 10,
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
    "imagens": [{
        "url": "https://i.imgur.com/dwDZICq.jpg",
        "description": "Imagem do Homem Aranha"
    }],
    "category": "Colecionáveis",
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

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1)
    value: number

    @IsNumber()
    @Min(0)
    quantity: number;

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
    createdAt: Date;

    @IsDateString()
    updatedAt: Date;
}