import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddServicoDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    preco: number;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
}
