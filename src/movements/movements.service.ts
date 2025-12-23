import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { MovementType } from '@prisma/client';

@Injectable()
export class MovementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovementDto, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: dto.productId },
        include: { inventory: true },
      });

      if (!product) {
        throw new BadRequestException('Producto no existe');
      }

      if (!product.inventory) {
        throw new BadRequestException('Producto sin inventario');
      }

      let newStock = product.inventory.stock;

      switch (dto.type) {
        case MovementType.IN:
          newStock += dto.quantity;
          break;

        case MovementType.OUT:
          if (newStock < dto.quantity) {
            throw new BadRequestException('Stock insuficiente');
          }
          newStock -= dto.quantity;
          break;

        case MovementType.ADJUSTMENT:
          newStock = dto.quantity;
          break;
      }

      await tx.inventory.update({
        where: { productId: product.id },
        data: { stock: newStock },
      });

      return tx.movement.create({
        data: {
          type: dto.type,
          quantity: dto.quantity,
          product: {
            connect: { id: product.id },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
    });
  }
}
