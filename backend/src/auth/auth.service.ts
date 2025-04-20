import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Check if the user exists and password is correct
  async validateUser(email: string, password: string): Promise<any> {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user not found, throw error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user without password
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  }

  // Generate JWT token for the user
  async login(user: any) {
    // Create payload for JWT token
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // Generate token and return user info
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };
  }

  // Register a new user
  async signup(email: string, password: string, name: string) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: Role.USER,
      },
    });

    // Return user without password
    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    };
  }
}
