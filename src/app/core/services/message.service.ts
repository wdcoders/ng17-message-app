import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IMessage } from '../models/common.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<IApiResponse<IMessage[]>> {
    return this.http.get<IApiResponse<IMessage[]>>(
      `${apiEndpoint.MessageEndpoint}`
    );
  }
}
