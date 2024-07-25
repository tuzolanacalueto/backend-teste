import { PartialType } from '@nestjs/mapped-types';
import { AddServicoDto } from './add-servico.dto';

export class UpdateServicoDto extends PartialType(AddServicoDto) { }
