import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { SubstitutionDialogComponent } from '../substitution-dialog/substitution-dialog.component';

@Component({
  selector: 'app-ai-recommendation',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatDialogModule, CommonModule],
  template: `
    <mat-card class="modern-card">
      <mat-card-title>AI Player Performance Rankings</mat-card-title>
      <table mat-table [dataSource]="rankedPlayers" class="mat-elevation-z8">
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
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let player">
            <button mat-raised-button color="warn" (click)="openSubstitutionDialog(player)">Substitute</button>
          </td>
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
    button {
      background: var(--neon-pink);
      color: var(--text-light);
    }
    button:hover {
      background: var(--neon-cyan);
      box-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
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
export class AiRecommendationComponent implements OnInit {
  rankedPlayers: any[] = [];
  teams: any[] = [];
  displayedColumns: string[] = ['player_name', 'team_name', 'score', 'action'];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getTeams().subscribe(teams => this.teams = teams);
    this.dataService.getPlayerRankings().subscribe(players => this.rankedPlayers = players);
  }

  getTeamName(teamKey: string): string {
    const team = this.teams.find(t => t.team_key === teamKey);
    return team ? team.team_name_std : 'Unknown';
  }

  openSubstitutionDialog(player: any): void {
    const dialogRef = this.dialog.open(SubstitutionDialogComponent, {
      width: '400px',
      data: { player, players: this.rankedPlayers }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.substitutePlayer(player.player_key, result.replacementId).subscribe(response => {
          alert(response.message);
        });
      }
    });
  }
}