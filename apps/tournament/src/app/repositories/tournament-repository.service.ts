import { Injectable } from '@nestjs/common';
import { Tournament } from '../api-model';

@Injectable()
export class TournamentRepositoryService {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(id: string): Tournament {
    return this.tournaments.get(id);
  }

  public getTournamentByName(name: string): Tournament {
    let fetchedTournament: Tournament = undefined;
    for (const [, value] of this.tournaments.entries()) {
      if (value.name == name) {
        fetchedTournament = value;
      }
    }
    return fetchedTournament;
  }
}
