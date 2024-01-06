import { DonnerM } from '../model/donner';

export interface DonnerRepository {
  insert(todo: DonnerM): Promise<DonnerM>;
  findAll(): Promise<DonnerM[]>;
  findById(id: number): Promise<DonnerM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
  getUserByUsername(name: string): Promise<DonnerM>;
}
