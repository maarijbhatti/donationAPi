import { DonnerM } from '../../domain/model/donner';
import { DonnerRepository } from '../../domain/repositories/donnerRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: DonnerRepository) { }

  async execute(username: string): Promise<any> {
    const user: DonnerM = await this.adminUserRepo.getUserByUsername(username);
    const { name } = user;
    return user;
  }
}
