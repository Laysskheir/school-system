import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, StudentsModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
