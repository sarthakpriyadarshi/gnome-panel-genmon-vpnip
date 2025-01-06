import { panel } from 'resource:///org/gnome/shell/ui/main.js';
import { VPNIPAddressIndicator } from './VPNIPAddressIndicator.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class VPNIpAddressExtension extends Extension {
    constructor(metadata) {
        super(metadata);

        // DO NOT create objects, connect signals or add main loop sources here
    }
    _indicator;
    enable() {
        this._indicator = new VPNIPAddressIndicator();
        panel.addToStatusArea('vpn-ip-address-indicator', this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = undefined;
    }
}
