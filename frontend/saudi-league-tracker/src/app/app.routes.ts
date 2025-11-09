import { Routes } from '@angular/router';
import { TeamRankingComponent } from './components/team-ranking/team-ranking.component';
import { PlayerTrackingComponent } from './components/player-tracking/player-tracking.component';
import { BestPlayersComponent } from './components/best-players/best-players.component';
import { AiRecommendationComponent } from './components/ai-recommendation/ai-recommendation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/teams', pathMatch: 'full' },
    { path: 'teams', component: TeamRankingComponent },
    { path: 'players', component: PlayerTrackingComponent },
    { path: 'best-players', component: BestPlayersComponent },
    { path: 'ai-recommendations', component: AiRecommendationComponent }
];