import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Added RouterModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule], // Added RouterModule
  template: `
    <div class="container">
      <mat-toolbar color="primary" class="modern-toolbar">
        <span>Saudi Pro League Tracker</span>
        <nav>
          <a mat-button routerLink="/teams" routerLinkActive="active">Team Rankings</a>
          <a mat-button routerLink="/players" routerLinkActive="active">Player Tracking</a>
          <a mat-button routerLink="/best-players" routerLinkActive="active">Best Players</a>
          <a mat-button routerLink="/ai-recommendations" routerLinkActive="active">AI Recommendations</a>
        </nav>
      </mat-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      min-height: 100vh;
    }
    .modern-toolbar {
      background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
      backdrop-filter: blur(5px);
      box-shadow: var(--shadow);
      border-radius: 0 0 12px 12px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav a {
      color: var(--text-light);
      margin-left: 25px;
      font-weight: 600;
      text-transform: uppercase;
      transition: color 0.3s ease;
    }
    nav a:hover, nav a.active {
      color: var(--neon-cyan);
      text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
    }
    @media (max-width: 600px) {
      nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      nav a {
        margin: 8px 0;
      }
    }
  `]
})
export class AppComponent { }