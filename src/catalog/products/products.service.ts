import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.product.findUnique({
        where: { sku: dto.sku },
      });

      if (existing) {
        throw new BadRequestException('SKU ya existe');
      }

      const product = await tx.product.create({
        data: {
          sku: dto.sku,
          name: dto.name,
        },
      });

      await tx.inventory.create({
        data: {
          productId: product.id,
          stock: dto.stockInicial,
          minStock: dto.minStock,
        },
      });

      return product;
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { inventory: true },
    });
  }
}
