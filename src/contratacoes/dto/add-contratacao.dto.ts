import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddContratacaoDto {
    @IsNotEmpty()
    @IsNumber()
    servicoId: number;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

    @IsNotEmpty()
    @IsNumber()
    valor: number;
}
