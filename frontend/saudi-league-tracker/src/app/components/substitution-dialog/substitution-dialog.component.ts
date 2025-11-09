import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-substitution-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <h2 mat-dialog-title>Substitute {{data.player.player_name_std}}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Select Replacement Player</mat-label>
        <mat-select [(ngModel)]="selectedPlayerId">
          <mat-option *ngFor="let player of data.players" [value]="player.player_key">
            {{player.player_name_std}} ({{getTeamName(player.team_key)}})
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()">Substitute</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 20px;
      box-shadow: var(--shadow);
    }
    mat-form-field {
      width: 100%;
      color: var(--text-light);
    }
    mat-label {
      color: var(--neon-cyan);
    }
    mat-select {
      color: var(--text-light);
    }
    button {
      margin: 10px;
      transition: transform 0.2s ease;
    }
    button[color="primary"] {
      background: var(--neon-cyan);
      color: var(--text-light);
    }
    button[color="primary"]:hover {
      background: var(--neon-pink);
      box-shadow: 0 0 12px rgba(255, 46, 99, 0.5);
    }
    button[mat-button] {
      color: var(--neon-pink);
    }
    @media (max-width: 600px) {
      mat-dialog-content {
        padding: 15px;
      }
      button {
        margin: 5px;
      }
    }
  `]
})
export class SubstitutionDialogComponent {
  selectedPlayerId: string = '';

  constructor(
    public dialogRef: MatDialogRef<SubstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  getTeamName(teamKey: string): string {
    return this.data.players.find((p: any) => p.team_key === teamKey)?.team_name_std || 'Unknown';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ replacementId: this.selectedPlayerId });
  }
}