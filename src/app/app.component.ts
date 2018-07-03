import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationSubscriptionsService } from './push-notification-subscriptions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 5 PWA';

  readonly VAPID_PUBLIC_KEY = 'BIK-LCn6TfVBYRXvhNJH6Qx27mxbHTQoQWeOIgFgTFBRt0xlM6QWrvbL3tKOtPP37q6ZMfj5ifeYdIQYJT-muUU';

// Public Key:
// BIK-LCn6TfVBYRXvhNJH6Qx27mxbHTQoQWeOIgFgTFBRt0xlM6QWrvbL3tKOtPP37q6ZMfj5ifeYdIQYJT-muUU

// Private Key:
// SNtiUdswHH2_Z8QDcQC162GUyz3G2mgCJMhgKsRcbVs

  constructor(private swPush: SwPush, private pushNotificationSubscriptionsService: PushNotificationSubscriptionsService) { }

  subscribeToPushNotifications() {
    console.log('swPush.isEnabled:', this.swPush.isEnabled);

    this.swPush.subscription.subscribe((sub) => console.log('swPush.subscription', sub));

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub);

      this.pushNotificationSubscriptionsService.createSubscription(sub)
        .subscribe(() => console.log('Push notification registration created!'),
          (error) => console.log(error));
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
