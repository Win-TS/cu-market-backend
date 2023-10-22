import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignUpDto, AuthLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        studentId: dto.studentId,
      },
    });
    if (!user) throw new ForbiddenException('Credentials Incorrect');
    const pwMatch = await bcrypt.compare(dto.password, user.hash);
    if (!pwMatch) throw new ForbiddenException('Credentials Incorrect');
    return this.signToken(user.id, user.studentId, dto.remember);
  }

  async signup(dto: AuthSignUpDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          studentId: dto.studentId,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.signToken(user.id, user.studentId);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    studentId: string,
    remember: boolean = false,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      studentId,
    };
    const expire = remember ? '90d' : '60m';
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: expire,
      secret: secret,
    });
    return { access_token: token };
  }
}
