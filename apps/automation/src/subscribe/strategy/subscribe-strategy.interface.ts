export interface SubscribeStrategy {
  subscribe(email: string, nickname?: string): Promise<string>;
}
