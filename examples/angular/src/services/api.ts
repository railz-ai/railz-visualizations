import { HttpClient } from '@angular/common/http';
import { AuthenticationParameters } from '../types/authentication';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpClient) {}

  getAccessToken = (config: AuthenticationParameters) => {
    return this.httpService.get(config.authUrl);
  };
}
