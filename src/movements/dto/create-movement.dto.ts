import { IsEnum, IsInt, Min } from 'class-validator';
import { MovementType } from '@prisma/client';

export class CreateMovementDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsEnum(MovementType)
  type: MovementType;
}
