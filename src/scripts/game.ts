class Game {
  private isPlaying: boolean;
  private player1Score: number;
  private player2Score: number;
  public player1Name: string;
  public player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 1;
    this.player1Score = 2;
    this.isPlaying = true;
  }

  getPlayer1Score(): number {
    return this.player1Score;
  }

  getPlayer2Score(): number {
    return this.player2Score;
  }

  play(): void {
    while (this.isPlaying) {}
  }

  runTurn(status: number) {}
}

export default Game;
