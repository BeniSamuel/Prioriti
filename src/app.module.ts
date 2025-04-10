import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'beni@ish',
      database: 'tasknestman',
      entities: [Users, Task],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    TaskModule,
    JwtModule.register({
      global: true,
      secret: 'Beni@IsH123'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
