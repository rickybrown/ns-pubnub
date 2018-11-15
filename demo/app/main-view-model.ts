import { Observable } from 'tns-core-modules/data/observable';
import { Pubnub, PubnubConfig, PubnubOptions } from 'ns-pubnub';

const pubnubConfig: PubnubConfig = {
  publishKey: 'demo',
  subscribeKey: 'demo',
}

const pubnubOptions: PubnubOptions = {
  cipherKey: 'a12345',
  suppressLeaveEvents: false
}

let pubnub = new Pubnub(pubnubConfig, pubnubOptions);

let channel = 'testchannel';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = 'sending a test messasge';

    // subsribe
    pubnub.subscribe([channel], true)

    pubnub.on('receiveMessage', (data) => {
      console.log(data)
    })
    pubnub.on('receivePresenceEvent', (data) => {
      console.log(data)
    })
    pubnub.on('receiveStatus', (data) => {
      console.log(data)
    })
  }

  public sendMessage() {
    pubnub.publish(channel, this.message, (status) => {
      conosle.log(status.information)
    })
  }

  public unsubscribe() {
    pubnub.unsubscribe([channel], true);
  }


}
