import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-team-ranking',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  template: `
    <mat-card class="modern-card">
      <mat-card-title>Team Rankings - Saudi Pro League</mat-card-title>
      <table mat-table [dataSource]="teamRankings" class="mat-elevation-z8">
        <ng-container matColumnDef="rank">
          <th mat-header-cell *matHeaderCellDef>Rank</th>
          <td mat-cell *matCellDef="let team; let i = index">{{i + 1}}</td>
        </ng-container>
        <ng-container matColumnDef="team_name">
          <th mat-header-cell *matHeaderCellDef>Team</th>
          <td mat-cell *matCellDef="let team">{{team.team_name_std}}</td>
        </ng-container>
        <ng-container matColumnDef="goals">
          <th mat-header-cell *matHeaderCellDef>Total Goals</th>
          <td mat-cell *matCellDef="let team">{{team.totalGoals}}</td>
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
export class TeamRankingComponent implements OnInit {
  teamRankings: any[] = [];
  displayedColumns: string[] = ['rank', 'team_name', 'goals'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTeams().subscribe(teams => {
      this.dataService.getStats().subscribe(stats => {
        this.teamRankings = teams.map(team => {
          const teamStats = stats.filter(s => s.team_name === team.team_name_std);
          const totalGoals = teamStats.reduce((sum, stat) => sum + (parseInt(stat.attack_buts) || 0), 0);
          return { ...team, totalGoals };
        }).sort((a, b) => b.totalGoals - a.totalGoals);
      });
    });
  }
}