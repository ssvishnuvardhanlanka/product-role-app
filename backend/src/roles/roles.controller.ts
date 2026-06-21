import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }
}