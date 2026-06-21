import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async createDefaultRoles() {
    const defaultRoles = ['VIEWER', 'EDITOR', 'MANAGER', 'ADMIN'];

    for (const roleName of defaultRoles) {
      const exists = await this.roleRepo.findOne({
        where: { name: roleName },
      });

      if (!exists) {
        await this.roleRepo.save({ name: roleName });
      }
    }
  }

  async create(dto: CreateRoleDto) {
    const roleName = dto.name.toUpperCase();

    const exists = await this.roleRepo.findOne({
      where: { name: roleName },
    });

    if (exists) {
      throw new BadRequestException('Role already exists');
    }

    return this.roleRepo.save({ name: roleName });
  }

  async findAll() {
    return this.roleRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findByName(name: string) {
    return this.roleRepo.findOne({
      where: { name },
    });
  }

  async findById(id: number) {
    return this.roleRepo.findOne({
      where: { id },
    });
  }
}