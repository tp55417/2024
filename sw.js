/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-3b6963d6'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/app-c7efd004.js",
    "revision": null
  }, {
    "url": "assets/banner-logo-6d7e2a97.js",
    "revision": null
  }, {
    "url": "assets/Community-202dc8ea.css",
    "revision": null
  }, {
    "url": "assets/Community-938a0526.js",
    "revision": null
  }, {
    "url": "assets/community-aea91992.js",
    "revision": null
  }, {
    "url": "assets/Guide-16c5a588.js",
    "revision": null
  }, {
    "url": "assets/Guide-5d38c1cd.css",
    "revision": null
  }, {
    "url": "assets/Home-b75b3112.js",
    "revision": null
  }, {
    "url": "assets/Home-c788c6f6.css",
    "revision": null
  }, {
    "url": "assets/index-d5613d85.css",
    "revision": null
  }, {
    "url": "assets/Landing-95486dc0.css",
    "revision": null
  }, {
    "url": "assets/Landing-a1a1985f.js",
    "revision": null
  }, {
    "url": "assets/Map-0c376a45.js",
    "revision": null
  }, {
    "url": "assets/Map-bedb3288.css",
    "revision": null
  }, {
    "url": "assets/Room-49d52900.css",
    "revision": null
  }, {
    "url": "assets/Room-752415b8.js",
    "revision": null
  }, {
    "url": "assets/Session-1e67e8f6.css",
    "revision": null
  }, {
    "url": "assets/Session-2239bc03.js",
    "revision": null
  }, {
    "url": "assets/session-a087a131.js",
    "revision": null
  }, {
    "url": "assets/Sponsor-6de61a95.js",
    "revision": null
  }, {
    "url": "assets/Sponsor-a8b1b3ff.css",
    "revision": null
  }, {
    "url": "assets/Sponsorship-005fcf13.css",
    "revision": null
  }, {
    "url": "assets/Sponsorship-5892e633.js",
    "revision": null
  }, {
    "url": "assets/Staff-6697bdfd.css",
    "revision": null
  }, {
    "url": "assets/Staff-e1e75395.js",
    "revision": null
  }, {
    "url": "assets/Topics-34ac06ed.css",
    "revision": null
  }, {
    "url": "assets/Topics-6ba954d0.js",
    "revision": null
  }, {
    "url": "assets/Venue-0389f8a1.js",
    "revision": null
  }, {
    "url": "assets/Venue-90f90259.css",
    "revision": null
  }, {
    "url": "assets/virtual_pwa-register-335a2119.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-dc90f814.js",
    "revision": null
  }, {
    "url": "en/community.html",
    "revision": "96c967012d7a01e409dc870b6e5c81ce"
  }, {
    "url": "en/community/index.html",
    "revision": "194f9d58834c2150fcb5cfe89882bd68"
  }, {
    "url": "en/index.html",
    "revision": "052e90b68bd1531734b613e4f9f5f1f8"
  }, {
    "url": "en/landing.html",
    "revision": "bef0ea30a657caaf5d8cad344c9582cb"
  }, {
    "url": "en/landing/index.html",
    "revision": "bef0ea30a657caaf5d8cad344c9582cb"
  }, {
    "url": "en/map.html",
    "revision": "f19179414f32238c8bbd426169650a14"
  }, {
    "url": "en/map/index.html",
    "revision": "f19179414f32238c8bbd426169650a14"
  }, {
    "url": "en/room.html",
    "revision": "6f29e408f89cb1dd2763fd7f95539566"
  }, {
    "url": "en/room/index.html",
    "revision": "6f29e408f89cb1dd2763fd7f95539566"
  }, {
    "url": "en/session.html",
    "revision": "b426161d13d055b6c0530e440e336d57"
  }, {
    "url": "en/sponsor.html",
    "revision": "2af1495f1997a220076d56a657cae3b7"
  }, {
    "url": "en/sponsor/index.html",
    "revision": "2af1495f1997a220076d56a657cae3b7"
  }, {
    "url": "en/sponsorship.html",
    "revision": "0228409460c0ceede27c57596d131d16"
  }, {
    "url": "en/sponsorship/index.html",
    "revision": "0228409460c0ceede27c57596d131d16"
  }, {
    "url": "en/staff.html",
    "revision": "1fb0980b75ae9a022e22999f88023d5d"
  }, {
    "url": "en/staff/index.html",
    "revision": "1fb0980b75ae9a022e22999f88023d5d"
  }, {
    "url": "en/venue.html",
    "revision": "a3efcbe11fa708618af88972de8ac156"
  }, {
    "url": "en/venue/index.html",
    "revision": "a3efcbe11fa708618af88972de8ac156"
  }, {
    "url": "index.html",
    "revision": "36ab294f65c8987165fdb7559ad0b697"
  }, {
    "url": "zh-TW/community.html",
    "revision": "9f090cd24af2da9731b92f265de45692"
  }, {
    "url": "zh-TW/community/index.html",
    "revision": "03412ff57e22c3b7c40fb67b5d968b92"
  }, {
    "url": "zh-TW/index.html",
    "revision": "7489c6c9b23c135bee2c0a8447deab8a"
  }, {
    "url": "zh-TW/landing.html",
    "revision": "644490a2be6e1c9e78b7ea9999121cda"
  }, {
    "url": "zh-TW/landing/index.html",
    "revision": "644490a2be6e1c9e78b7ea9999121cda"
  }, {
    "url": "zh-TW/map.html",
    "revision": "7b911625e668c6d9942b96b96849bec0"
  }, {
    "url": "zh-TW/map/index.html",
    "revision": "7b911625e668c6d9942b96b96849bec0"
  }, {
    "url": "zh-TW/room.html",
    "revision": "27449b33564ef481bde12f28f6c99065"
  }, {
    "url": "zh-TW/room/index.html",
    "revision": "27449b33564ef481bde12f28f6c99065"
  }, {
    "url": "zh-TW/session.html",
    "revision": "996275913710bd4518a8a711e27d3f18"
  }, {
    "url": "zh-TW/sponsor.html",
    "revision": "de1eadd68aee9b876d3e5ff2dee554c1"
  }, {
    "url": "zh-TW/sponsor/index.html",
    "revision": "de1eadd68aee9b876d3e5ff2dee554c1"
  }, {
    "url": "zh-TW/sponsorship.html",
    "revision": "2b67f12149cd9ac1d505e894e78ee31d"
  }, {
    "url": "zh-TW/sponsorship/index.html",
    "revision": "2b67f12149cd9ac1d505e894e78ee31d"
  }, {
    "url": "zh-TW/staff.html",
    "revision": "5752504e0a287b642513f59c55ea8c00"
  }, {
    "url": "zh-TW/staff/index.html",
    "revision": "5752504e0a287b642513f59c55ea8c00"
  }, {
    "url": "zh-TW/venue.html",
    "revision": "5e18964dfa7545de38f49d37ccb5578a"
  }, {
    "url": "zh-TW/venue/index.html",
    "revision": "5e18964dfa7545de38f49d37ccb5578a"
  }, {
    "url": "favicon.svg",
    "revision": "481a70df0b95472a1f4b2223c1a6b8f5"
  }, {
    "url": "manifest.webmanifest",
    "revision": "17caa39038465cd3c2f42cf70eccd808"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/.*\.(jpg|png|svg|json|js|xml|pdf)$/]
  }));
  workbox.registerRoute(/^https:\/\/script\.google\.com\/.*/i, new workbox.NetworkFirst({
    "cacheName": "room-status-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 2,
      maxAgeSeconds: 2592000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200, 301]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/coscup\.org\/2024\/json\/.*/i, new workbox.NetworkFirst({
    "cacheName": "json-data-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 432000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200, 301]
    })]
  }), 'GET');
  workbox.initialize({});

}));
