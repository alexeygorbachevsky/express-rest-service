import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from '../services/boards.service';
import { IBoard } from '../interfaces/board.interface';
import Board from '../entities/board.entity';
import { HttpExceptionFilter } from '../../errors/http-exception.filter';
import { JwtAuthGuard } from '../../authorization/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Post()
  async create(@Body() newBoard: IBoard) {
    return this.boardsService.create(Board.fromRequest(newBoard));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newBoard: IBoard) {
    return this.boardsService.update(id, newBoard);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
