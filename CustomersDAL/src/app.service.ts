import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): string {
    return 'Customer DAL APIs v1.0 up!!';
  }
}
