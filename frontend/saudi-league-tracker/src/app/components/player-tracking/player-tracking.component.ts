import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-player-tracking',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  template: `
    <mat-card class="modern-card">
      <mat-card-title>Player Tracking</mat-card-title>
      <table mat-table [dataSource]="players" class="mat-elevation-z8">
        <ng-container matColumnDef="player_name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let player">{{player.player_name_std}}</td>
        </ng-container>
        <ng-container matColumnDef="team_name">
          <th mat-header-cell *matHeaderCellDef>Team</th>
          <td mat-cell *matCellDef="let player">{{getTeamName(player.team_key)}}</td>
        </ng-container>
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Position</th>
          <td mat-cell *matCellDef="let player">{{player.position}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `,
  styles: [`
    .modern-card {
      margin: 30px;
      padding: 20px;
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      box-shadow: var(--shadow);
      animation: fadeIn 0.5s ease-in-out;
    }
    mat-card-title {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    th, td {
      text-align: center;
      padding: 15px;
    }
    td {
      color: #000000; /* Black text for table cells */
    }
    tr:hover {
      background: rgba(0, 240, 255, 0.1);
      transition: background 0.3s ease;
    }
    @media (max-width: 600px) {
      .modern-card {
        margin: 15px;
        padding: 15px;
      }
      table {
        font-size: 0.9rem;
      }
    }
  `]
})
export class PlayerTrackingComponent implements OnInit {
  players: any[] = [];
  teams: any[] = [];
  displayedColumns: string[] = ['player_name', 'team_name', 'position'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTeams().subscribe(teams => this.teams = teams);
    this.dataService.getPlayers().subscribe(players => this.players = players);
  }

  getTeamName(teamKey: string): string {
    const team = this.teams.find(t => t.team_key === teamKey);
    return team ? team.team_name_std : 'Unknown';
  }
}