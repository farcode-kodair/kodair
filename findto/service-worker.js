importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}



registerRoute(
  ({request}) => request.destination === 'script',
  new NetworkFirst()
);