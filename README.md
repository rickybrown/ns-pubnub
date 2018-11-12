# NativeScript PubNub ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png)

### THIS IS NOT READY FOR PRODUCTION, JUST FOR DEVELOPING/TESTING

This plugin is allows you to use the [PubNub Objective-C SDK](https://www.pubnub.com/docs/ios-objective-c/pubnub-objective-c-sdk) in your NativeScript app.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add ns-pubnub
```

## Usage

```javascript
// import
import { Pubnub, PubnubConfig } from 'ns-pubnub';

// configure
const pubnubConfig: PubnubConfig = {
  publishKey: 'demo',
  subscribeKey: 'demo',
  options: {
    cipherKey: '12345',
    suppressLeaveEvents: false
  }
}

let pubnub = new Pubnub(pubnubConfig);

// subscribe
pubnub.subscribe(['my_channel'], true)

// publish message
pubnub.publish('my_channel', this.message, (status) => {
  conosle.log(status.information)
})

// listen to receive events
pubnub.on('receiveMessage', (data) => {
  console.log(data)
})
pubnub.on('receivePresenceEvent', (data) => {
  console.log(data)
})
pubnub.on('receiveStatus', (data) => {
  console.log(data)
})
```

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| cipherKey | string | _ | Key which is used to encrypt messages pushed to PubNub service and decrypt messages received from live feeds on which client subscribed at this moment. |
| stripMobilePayload | boolean | _ | Stores whether client should strip out received messages (real-time and history) from data which has been appended by client (like mobile payload for push notifications). |
| subscribeMaximumIdleTime | number | 310 | Maximum number of seconds which client should wait for events from live feed. |
| nonSubscribeRequestTimeout | number | 10 | Number of seconds which is used by client during non-subscription operations to check whether response potentially failed with timeout or not. |
| presenceHeartbeatValue | number | _ | Number of seconds which is used by server to track whether client still subscribed on remote data objects live feed or not. |
| presenceHeartbeatInterval | number | _ | Number of seconds which is used by client to issue heartbeat requests to PubNub service. |
| keepTimeTokenOnListChange | boolean | true | Whether client should keep previous time token when subscribe on new set of remote data objects live feeds. |
| catchUpOnSubscriptionRestore | boolean | true | Whether client should try to catch up for events which occurred on previously subscribed remote data objects feed while client was off-line. |
| applicationExtensionSharedGroupIdentifier | string | _ | Reference on group identifier which is used to share request cache between application extension and it's containing application. This property should be set to valid registered group only if PubNub client is used inside of application's extension (iOS 8.0+, macOS 10.10+). |
| requestMessageCountThreshold | number |  | Number of maximum expected messages from PubNub service in single response. |
| maximumMessagesCacheSize | number | 100 | Messages de-duplication cache size |
| completeRequestsBeforeSuspension | boolean | true | Whether client should try complete all API call which is done before application will be completely suspended. |
| suppressLeaveEvents | boolean | _ | Whether client shouldn't send presence leave events during unsubscription process. |

## License

Apache License Version 2.0, January 2004
