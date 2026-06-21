import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/roles')
  @Roles('ADMIN')
  updateRoles(
    @Param('id') id: string,
    @Body() dto: UpdateUserRolesDto,
  ) {
    return this.usersService.updateRoles(Number(id), dto.roleIds);
  }
}