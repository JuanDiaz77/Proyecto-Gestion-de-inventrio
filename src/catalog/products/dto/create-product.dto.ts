import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  minStock: number;

  @IsInt()
  @Min(0)
  stockInicial: number;
}

