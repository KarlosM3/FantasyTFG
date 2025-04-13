export interface Player {
  id: string;
  nickname: string;
  positionId: string;
  playerStatus: string;
  marketValue: string;
  lastSeasonPoints: string;
  points: number;
  averagePoints: number;
  images: {
    transparent?: string;
    '256x256'?: string;
  };
  team: {
    id: string;
    name: string;
    slug: string;
    badgeColor: string;
  };
}
