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

  public clientDidReceiveMessage(client, message) {
    this._owner.get().notify({
      eventName: 'receiveMessage',
      object: this.transformToJSON(message.data)
    });
  }

  public clientDidReceivePresenceEvent(client, event) {
    this._owner.get().notify({
      eventName: 'receivePresenceEvent',
      object: this.transformToJSON(event.data)
    });
  }

  public clientDidReceiveStatus(client, status) {
    this._owner.get().notify({
      eventName: 'receiveStatus',
      object: this.transformToJSON(status.data)
    });
  }

  private transformToJSON(obj) {
    return JSON.parse(obj.toString()
      .replace(/["']/g, '')
      .replace(/([^\s].*) = ([^;{}]*)[;]/gi, '\"$1\": \"$2\",')
      .replace(/([^\s].*) =\s+{/gi, '\"$1\": {')
      .replace('};', '}')
      .replace('}', '},')
      .replace(/\,(?!\s*?[\{\[\"\'\w])/gi, ''));
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
  public subscribe(channels: string[], withPresence: boolean) {
    this._client.subscribeToChannelsWithPresence(channels, withPresence);
  }

  // subsribe to channel groups
  public subscribeToChannelGroups(groups: string[], shouldObservePresence: boolean) {
    this._client.subscribeToChannelGroupsWithPresence(groups, shouldObservePresence);
  }

  // unsubscribe from channels
  public unsubscribe(channels: string[], withPresence: boolean) {
    this._client.unsubscribeFromChannelsWithPresence(channels, withPresence);
  }

  // unsubscribe from all channels
  public unsubscribeFromAll() {
    this._client.unsubscribeFromAll();
  }

  // unsubscribe from channel groups
  public unsubscribeFromChannelGroups(groups: string[], withPresence: boolean) {
    this._client.unsubscribeFromChannelGroupsWithPresence(groups, withPresence);
  }

  // Publish message and get status
  public publish(channel, msgObj, callback) {
    this._client.publishToChannelWithCompletion(msgObj, channel, (status) => {
      callback(status.data)
    });
  }

}
