import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 16, nullable: true })
  card_number: string;

  @Column('string', { default: false })
  name_on_card: string;

  @Column('varchar', { length: 3, nullable: true })
  cvc: number;

  @CreateDateColumn({ name: 'createdate' })
  expireDate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  issueDate: Date;
}
