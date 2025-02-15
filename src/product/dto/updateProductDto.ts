import { Type } from "class-transformer";
import { ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
    Min,
    ValidateNested
} from "class-validator";
import { FeaturesProductDto, ImageProductDto } from "./createProductDto";

export class UpdateProductDto {

    @IsUUID()
    id: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1)
    @IsOptional()
    value: number

    @IsNumber()
    @Min(0)
    @IsOptional()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    @IsOptional()
    description: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => FeaturesProductDto)
    @IsOptional()
    features: FeaturesProductDto[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImageProductDto)
    @IsOptional()
    images: ImageProductDto[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category: string;

    @IsUUID()
    userId: string;
}