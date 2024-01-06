import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonnerM } from '../../domain/model/donner';
import { DonnerRepository } from '../../domain/repositories/donnerRepository.interface';
import { Donner } from '../entities/donner.entity';

@Injectable()
export class DatabaseDonnerRepository implements DonnerRepository {
  constructor(
    @InjectRepository(Donner)
    private readonly donnerEntityRepository: Repository<Donner>,
  ) { }

  async getUserByUsername(name: string): Promise<DonnerM> {
    return null
  }

  async insert(donner: DonnerM): Promise<DonnerM> {
    const donnerEntity = this.toDonnerEntity(donner);
    const result = await this.donnerEntityRepository.insert(donnerEntity);
    return this.toDonner(result.generatedMaps[0] as Donner);
    console.log(result.generatedMaps);
  }
  async findAll(): Promise<DonnerM[]> {
    const donnersEntity = await this.donnerEntityRepository.find();
    return donnersEntity.map((donnerEntity) => this.toDonner(donnerEntity));
  }
  async findById(id: number): Promise<DonnerM> {
    const donnerEntity = await this.donnerEntityRepository.findOneOrFail(id);
    return this.toDonner(donnerEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.donnerEntityRepository.delete({ id: id });
  }

  private toDonner(donnerEntity: Donner): DonnerM {
    const donner: DonnerM = new DonnerM();

    donner.id = donnerEntity.id;
    donner.name = donnerEntity.name;
    donner.phonenumber = donnerEntity.phonenumber;

    return donner;
  }

  private toDonnerEntity(donner: DonnerM): Donner {
    const donnerEntity: Donner = new Donner();

    donnerEntity.id = donner.id;
    donnerEntity.name = donner.name;
    donnerEntity.phonenumber = donner.phonenumber;

    return donnerEntity;
  }
}
