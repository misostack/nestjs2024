import { LoginAttempt } from '@modules/auth/entities/login-attempt';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LoginAttemptRepository extends Repository<LoginAttempt> {
  constructor(private dataSource: DataSource) {
    super(LoginAttempt, dataSource.createEntityManager());
  }
}
