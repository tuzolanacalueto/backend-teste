import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        UsuariosModule,
        PassportModule,
        JwtModule.register({
            secret: 'euclidesserafim',
            signOptions: { expiresIn: '3h' },
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule { }
