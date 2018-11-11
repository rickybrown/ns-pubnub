import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';

export interface PubnubOptions {
  cipherKey: string;
  stripMobilePayload: boolean;
  subscribeMaximumIdleTime: number;
  nonSubscribeRequestTimeout: number;
  presenceHeartbeatValue: number;
  presenceHeartbeatInterval: number;
  keepTimeTokenOnListChange: boolean;
  catchUpOnSubscriptionRestore: boolean;
  applicationExtensionSharedGroupIdentifier: string;
  requestMessageCountThreshold: number;
  maximumMessagesCacheSize: number;
  completeRequestsBeforeSuspension: boolean;
  suppressLeaveEvents: boolean;
}

export interface PubnubConfig {
  publishKey: string;
  subscribeKey: string;
  options: PubnubOptions;
}

export class Common extends Observable {

}
