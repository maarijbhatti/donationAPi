import { UserM, UserWithoutPassword } from '../../domain/model/availableBalance';
import { UserRepository } from '../../domain/repositories/availableBalanceRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) { }

  async execute(username: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getUserByUsername(username);
    const { password, ...info } = user;
    return info;
  }
}
