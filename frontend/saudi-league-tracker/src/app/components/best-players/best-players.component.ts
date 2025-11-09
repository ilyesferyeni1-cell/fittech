import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-best-players',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  template: `
    <mat-card class="modern-card">
      <mat-card-title>Best Players by Position</mat-card-title>
      <div *ngFor="let position of positions">
        <h3>{{position}}</h3>
        <table mat-table [dataSource]="getPlayersByPosition(position)" class="mat-elevation-z8">
          <ng-container matColumnDef="player_name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let player">{{player.player_name_std}}</td>
          </ng-container>
          <ng-container matColumnDef="team_name">
            <th mat-header-cell *matHeaderCellDef>Team</th>
            <td mat-cell *matCellDef="let player">{{getTeamName(player.team_key)}}</td>
          </ng-container>
          <ng-container matColumnDef="score">
            <th mat-header-cell *matHeaderCellDef>Performance Score</th>
            <td mat-cell *matCellDef="let player">{{player.performanceScore | number:'1.0-2'}}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
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
    h3 {
      font-size: 1.4rem;
      margin: 20px 0 10px;
    }
    table {
      width: 100%;
      margin-bottom: 20px;
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
export class BestPlayersComponent implements OnInit {
  players: any[] = [];
  teams: any[] = [];
  positions: string[] = ['GK', 'DEF', 'MID', 'FWD'];
  displayedColumns: string[] = ['player_name', 'team_name', 'score'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTeams().subscribe(teams => this.teams = teams);
    this.dataService.getPlayers().subscribe(players => this.players = players);
  }

  getTeamName(teamKey: string): string {
    const team = this.teams.find(t => t.team_key === teamKey);
    return team ? team.team_name_std : 'Unknown';
  }

  getPlayersByPosition(position: string): any[] {
    return this.players
      .filter(p => p.position === position)
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 5);
  }
}