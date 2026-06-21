import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';

import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Product } from './products/product.entity';
import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [User, Role, Product],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Role, Product],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async onApplicationBootstrap() {
    await this.rolesService.createDefaultRoles();
    await this.usersService.createDefaultAdmin();
  }
}