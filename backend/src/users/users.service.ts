import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(username: string, password: string, defaultRoleName = 'VIEWER') {
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepo.findOne({
      where: { name: defaultRoleName },
    });

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      roles: role ? [role] : [],
    });

    return this.userRepo.save(user);
  }

  async createDefaultAdmin() {
    const username = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

    const exists = await this.userRepo.findOne({
      where: { username },
    });

    if (exists) return;

    const adminRole = await this.roleRepo.findOne({
      where: { name: 'ADMIN' },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = this.userRepo.create({
      username,
      password: hashedPassword,
      roles: adminRole ? [adminRole] : [],
    });

    await this.userRepo.save(admin);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
    });
  }

  async findById(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async findAll() {
    return this.userRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async updateRoles(userId: number, roleIds: number[]) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.roleRepo.find({
      where: {
        id: In(roleIds),
      },
    });

    user.roles = roles;

    return this.userRepo.save(user);
  }
}