import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsuariosService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'euclidesserafim',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.buscarPorId(payload.sub);
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return { id: user.id, email: user.email, type: user.tipo };
    }
}
