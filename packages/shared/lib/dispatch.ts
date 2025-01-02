import { EVENT_NEED } from "./keys";
import {NeedVariableOptions} from '@debug-mate/types'

export function dispatchNeedEvent(options: NeedVariableOptions) {
  let event = new CustomEvent(EVENT_NEED, {
    detail: options
  });
  window.dispatchEvent(event)
}

export function dispatchNeedValueEvent() {}

export function dispatchValueChangeEvent() {}
