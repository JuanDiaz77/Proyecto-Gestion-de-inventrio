import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { MovementType } from '@prisma/client';

export class CreateMovementDto {
  @IsEnum(MovementType, {
    message: 'El tipo debe ser IN, OUT o ADJUSTMENT',
  })
  type: MovementType;

  @IsInt()
  @IsPositive({
    message: 'La cantidad debe ser un número entero positivo',
  })
  quantity: number;

  @IsInt({
    message: 'productId debe ser un número entero',
  })
  productId: number;
}
