import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { AuthenticationParameters } from '../types/authentication';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpClient) {}

  getAccessToken = (config: AuthenticationParameters) => {
    return this.httpService.get(config.authUrl);
  };
}
