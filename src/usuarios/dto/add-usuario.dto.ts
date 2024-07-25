import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    nif: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    tipo: string; // 'Cliente' ou 'Prestador'
}
