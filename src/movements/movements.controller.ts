import { Controller, Post, Body, Req } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.OPERADOR)
  create(@Body() dto: CreateMovementDto, @Req() req) {
    console.log(req.user);
    return this.movementsService.create(dto, req.user.userId);
  }
  
}
