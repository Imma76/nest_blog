import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    
    next();
  }
}
