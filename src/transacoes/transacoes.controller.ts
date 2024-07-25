import { Controller, Get } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';

@Controller('transacoes')
export class TransacoesController {
    constructor(private readonly transacoesService: TransacoesService) { }

    @Get()
    async buscarTodas() {
        return this.transacoesService.buscarTodas();
    }
}
