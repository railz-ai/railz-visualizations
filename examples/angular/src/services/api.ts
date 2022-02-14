import {HttpClient} from "@angular/common/http";

export class ApiService {

  constructor(private httpService: HttpClient) {
  }

  getAccessToken = (authUrl: string, clientId: string, clientSecret: string) => {
    return this.httpService.get(authUrl, {"headers": {'Authorization': `Basic ${clientId}:${clientSecret}`}});
  }
}
