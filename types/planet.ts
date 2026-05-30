export interface Planet {
  id: string;
  name: string;
  description: string;
  theme: string;
  position: [number, number, number];
  orbitRadius: number;
  color: string;
  status: 'UNKNOWN' | 'DISCOVERED' | 'LOCKED';
  destination: string;
  unlocked: boolean;
}
