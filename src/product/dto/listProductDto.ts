export class ListFeaturesProductDto {
    name: string;
    description: string;
}

export class ListImageProductDto {
    url: string;
    description: string;
}

export class ListProductDto {
    constructor(
      readonly id: string,
      readonly userId: string,
      readonly name: string,
      readonly value: number,
      readonly quantity: number,
      readonly description: string,
      readonly category: string,
      readonly features?: ListFeaturesProductDto[],
      readonly images?: ListImageProductDto[],
    ) {}
}