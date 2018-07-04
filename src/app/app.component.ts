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

  readonly VAPID_PUBLIC_KEY = 'BAvyBimPt4GhPo5qWR-6GhPo6kMlwsmxGgVyRvuRYtEck0Hz4kLOG8lc23p3K_mRH1bgqUU5BdWzxMXb6boVzi4';

// {"publicKey":"BAvyBimPt4GhPo5qWR-6GhPo6kMlwsmxGgVyRvuRYtEck0Hz4kLOG8lc23p3K_mRH1bgqUU5BdWzxMXb6boVzi4","privateKey":"WgOFGuwBA8tVzVOQn2M-oFqtgZvlmvJtFLC1VHq-Pho"}

  constructor(private swPush: SwPush, private pushNotificationSubscriptionsService: PushNotificationSubscriptionsService) { }

  subscribeToPushNotifications() {
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
