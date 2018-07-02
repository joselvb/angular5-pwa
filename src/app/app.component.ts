import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 5 PWA';

  pushIsSupported: boolean = 'serviceWorker' in navigator && 'PushManager' in window;
  vapidPublicKey: string = 'BIK-LCn6TfVBYRXvhNJH6Qx27mxbHTQoQWeOIgFgTFBRt0xlM6QWrvbL3tKOtPP37q6ZMfj5ifeYdIQYJT-muUU';

// Public Key:
// BIK-LCn6TfVBYRXvhNJH6Qx27mxbHTQoQWeOIgFgTFBRt0xlM6QWrvbL3tKOtPP37q6ZMfj5ifeYdIQYJT-muUU

// Private Key:
// SNtiUdswHH2_Z8QDcQC162GUyz3G2mgCJMhgKsRcbVs

  constructor() {
    console.log('pushIsSupported: ' + this.pushIsSupported);
  }

  subscribeToPushNotifications() {
    if (this.pushIsSupported) {
      navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
        console.log('serviceWorkerRegistration:', serviceWorkerRegistration);

        serviceWorkerRegistration.pushManager.getSubscription().then(subscription => {
          console.log('subscription:', subscription);

          if (subscription) {
            return;
          }

          return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
          }).then(subscription => {
            const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            const authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
            const endpoint = subscription.endpoint;

            console.log('rawKey:', rawKey);
            console.log('key:', key);
            console.log('rawAuthSecret:', rawAuthSecret);
            console.log('authSecret:', authSecret);
            console.log('endpoint:', endpoint);
          });
        });
      });
    }
  }

  private urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
