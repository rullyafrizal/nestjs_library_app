import { HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ApiHttpResponse {
  status: HttpStatus | number;
  message: string;
  body?: any;
}
