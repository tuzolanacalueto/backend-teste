import { PartialType } from '@nestjs/mapped-types';
import { AddUsuarioDto } from './add-usuario.dto';

export class UpdateUsuarioDto extends PartialType(AddUsuarioDto) { }
