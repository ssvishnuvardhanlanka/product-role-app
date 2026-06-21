import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles('VIEWER', 'EDITOR', 'MANAGER', 'ADMIN')
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @Roles('EDITOR', 'MANAGER', 'ADMIN')
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @Roles('EDITOR', 'MANAGER', 'ADMIN')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles('MANAGER', 'ADMIN')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}