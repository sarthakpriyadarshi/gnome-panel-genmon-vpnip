import { panel } from 'resource:///org/gnome/shell/ui/main.js';
import { VPNIPAddressIndicator } from './VPNIPAddressIndicator.js';

export default class VPNIpAddressExtension {
    _indicator;

    enable() {
        this._indicator = new VPNIPAddressIndicator();
        panel.addToStatusArea('vpn-ip-address-indicator', this._indicator);
    }

    disable() {
        this._indicator.stop();
        this._indicator.destroy();
        this._indicator = undefined;
    }
}
