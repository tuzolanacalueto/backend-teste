import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [],
    controllers: [ServicosController],
    providers: [ServicosService, PrismaService],
    exports: [ServicosService],
})
export class ServicosModule { }
