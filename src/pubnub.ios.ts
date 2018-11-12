import { Observable } from 'tns-core-modules/data/observable';
import { Common, PubnubConfig, PubnubOptions } from './pubnub.common';
import * as utils from "tns-core-modules/utils/utils";

declare var PubNub, PNConfiguration, PNObjectEventListener;

export class PubnubDelegate extends NSObject {
  public static ObjCProtocols = [PNObjectEventListener];
  private _owner: WeakRef<Pubnub>;

  public static initWithOwner(owner: WeakRef<Pubnub>): PubnubDelegate {
    let delegate = <PubnubDelegate>PubnubDelegate.new();
    delegate._owner = owner;

    return delegate;
  }

  public clientDidReceiveMessage(client, msgObj) {
    let data: any = {
      channel:   msgObj.data.channel,
      message:   msgObj.data.message,
      uuid:      msgObj.uuid,
      timetoken: msgObj.data.timetoken
    }
    this._owner.get().notify({
      eventName: 'receiveMessage', object: data
    });
  }

  public clientDidReceivePresenceEvent(client, event) {
    let data: any = {
      channel:       event.data.channel,
      occupancy:     event.data.presence.occupancy,
      uuid:          event.data.presence.uuid,
      timetoken:     event.data.presence.timetoken,
      presenceEvent: event.data.presenceEvent,
      statusCode:    event.data.statusCode
    }
    this._owner.get().notify({
      eventName: 'receivePresenceEvent', object: data
    });
  }

  public clientDidReceiveStatus(client, status) {
    let data: any = {
      currentTimetoken: status.currentTimetoken,
      statusCode:       status.statusCode,
      timetoken:        status.data.timetoken
    }
    this._owner.get().notify({
      eventName: 'receiveStatus', object: data
    });
  }

}

export class Pubnub extends Common {
  private _config:   any;
  private _client:   any;
  private _delegate: any;

  constructor(config: PubnubConfig, options: PubnubOptions) {
    super()

    this._config = PNConfiguration.configurationWithPublishKeySubscribeKey(config.publishKey, config.subscribeKey);

    if(options) {
      for(let option of Object.keys(options)) {
        this._config[option] = options[option];
      }
    }
    this._client   = PubNub.clientWithConfiguration(this._config);
    this._delegate = PubnubDelegate.initWithOwner(new WeakRef(this));

    this._client.addListener(this._delegate);
  }

  // subsribe to channels
  public subscribe(channels, withPresence) {
    this._client.subscribeToChannelsWithPresence(channels, withPresence);
  }

  // Publish message and get status
  public publish(channel, msgObj, callback) {
    this._client.publishToChannelWithCompletion(msgObj, channel, (status) => {
      callback(status.data)
    });
  }

}
