import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiresInEnv = config.get<string>('JWT_EXPIRES_IN');

        if (!secret) throw new Error('JWT_SECRET must be defined in .env');

        // Validar y cast seguro a StringValue
        const expiresIn: `${number}${"s"|"m"|"h"|"d"|"y"}` = 
            (expiresInEnv || '1h') as `${number}${"s"|"m"|"h"|"d"|"y"}`;

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}