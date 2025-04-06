import { Request } from 'express';
import { User } from 'src/database/user.entity';

export interface AppRequest extends Request {
  user?: User;
}
