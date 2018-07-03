import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationSubscriptionsService {

  constructor(private http: HttpClient) { }

  createSubscription(pushSubscription) {
    return this.http.post('http://localhost:5000/api/PushNotificationSubscriptions', pushSubscription);
  }

}
