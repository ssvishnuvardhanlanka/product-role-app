import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    return this.productRepo.save(dto);
  }

  findAll() {
    return this.productRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, dto);

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepo.remove(product);

    return {
      message: 'Product deleted successfully',
    };
  }
}