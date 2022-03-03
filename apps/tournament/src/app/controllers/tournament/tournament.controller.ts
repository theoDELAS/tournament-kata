import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Tournament, TournamentToAdd } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Post()
  public createTournament(@Body() tournamentToAdd: TournamentToAdd): {
    id: string;
  } {
    switch (tournamentToAdd.name) {
      case undefined:
      case '':
        throw new BadRequestException();
    }

    if (
      this.tournamentRepository.getTournamentByName(tournamentToAdd.name) !=
      undefined
    ) {
      throw new BadRequestException();
    }

    const tournament = {
      id: uuidv4(),
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };
    this.tournamentRepository.saveTournament(tournament);

    return { id: tournament.id };
  }

  @Get(':id')
  public getTournament(@Param('id') id: string): Tournament {
    const tournament = this.tournamentRepository.getTournament(id);
    if (tournament == undefined || tournament.name == undefined) {
      throw new NotFoundException();
    }
    return tournament;
  }
}
