import { Component, OnInit } from '@angular/core';
import { FantasyApiService } from '../../core/services/fantasy-api.service';
import { Player } from '../../core/models/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  positionFilter = '';

  constructor(private fantasyApiService: FantasyApiService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.isLoading = true;
    this.fantasyApiService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = [...this.players];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los jugadores. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
        console.error('Error cargando jugadores:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredPlayers = this.players.filter(player => {
      const nameMatch = player.nickname.toLowerCase().includes(this.searchTerm.toLowerCase());
      const positionMatch = this.positionFilter ? player.positionId === this.positionFilter : true;
      return nameMatch && positionMatch;
    });
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onPositionFilterChange(position: string): void {
    this.positionFilter = position;
    this.applyFilters();
  }

  formatMarketValue(value: string): string {
    const numValue = parseInt(value, 10);
    return numValue >= 1000000 ? (numValue / 1000000).toFixed(1) + 'M' :
           numValue >= 1000 ? (numValue / 1000).toFixed(1) + 'K' :
           value;
  }
}
