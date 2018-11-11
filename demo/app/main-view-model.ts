import { Observable } from 'tns-core-modules/data/observable';
import { Pubnub, PubnubConfig } from 'nativescript-pubnub';

const pubnubConfig: PubnubConfig = {
  publishKey: 'pub-c-9e361b88-6346-472f-abef-932548c3aca8',
  subscribeKey: 'sub-c-852e781c-e24a-11e8-9c1c-529fcc5a7500',
  options: {
    cipherKey: 'a12345',
    suppressLeaveEvents: false
  }
}

let pubnub = new Pubnub(pubnubConfig);

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
      // conosle.log(status.information)
    })
  }

  public receiveMessage() {
    pubnub.receiveMessage(channel, { message: this.message })
  }

}
