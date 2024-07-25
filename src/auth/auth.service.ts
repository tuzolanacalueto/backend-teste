import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usuariosService.buscarPorEmail(email);
        if (user && bcrypt.compareSync(password, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
