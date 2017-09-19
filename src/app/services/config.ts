import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  constructor() {}

  readonly polling = {
    heartbeat: 250,
    timeout: 1800000
  };

  readonly http = {
    timeout: 5000
  };

  readonly baseUrl = 'https://dev.shoutpoint.com';
  readonly appSig = 'b8ca1e5d-0c3b-49e0-82b5-8f9b84354180';
}
