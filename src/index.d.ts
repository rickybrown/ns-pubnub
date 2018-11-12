import { Common } from './pubnub.common';
export interface PubnubOptions {
    cipherKey?: string;
    stripMobilePayload?: boolean;
    subscribeMaximumIdleTime?: number;
    nonSubscribeRequestTimeout?: number;
    presenceHeartbeatValue?: number;
    presenceHeartbeatInterval?: number;
    keepTimeTokenOnListChange?: boolean;
    catchUpOnSubscriptionRestore?: boolean;
    applicationExtensionSharedGroupIdentifier?: string;
    requestMessageCountThreshold?: number;
    maximumMessagesCacheSize?: number;
    completeRequestsBeforeSuspension?: boolean;
    suppressLeaveEvents?: boolean;
}
export interface PubnubConfig {
    publishKey: string;
    subscribeKey: string;
}
export declare class PubnubDelegate extends NSObject {
    static ObjCProtocols: any[];
    private _owner;
    static initWithOwner(owner: WeakRef<Pubnub>): PubnubDelegate;
    clientDidReceiveMessage(client: any, msgObj: any): void;
    clientDidReceivePresenceEvent(client: any, event: any): void;
    clientDidReceiveStatus(client: any, status: any): void;
}
export declare class Pubnub extends Common {
    private _config;
    private _client;
    private _delegate;
    constructor(config: PubnubConfig, options: PubnubOptions);
    subscribe(channels: any, withPresence: any): void;
    publish(channel: any, msgObj: any, callback: any): void;
}
