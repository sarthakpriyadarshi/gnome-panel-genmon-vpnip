import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Utils from './utils.js';

const DEBUG_LOG = false;

function debugLog(message) {
    if (DEBUG_LOG) {
        log(message);
    }
}

export const VPNIPAddressIndicator = GObject.registerClass(
    {
        GTypeName: 'VPNIPAddressIndicator',
    },
    class VPNIPAddressIndicator extends PanelMenu.Button {
        _init() {
            super._init(0, "VPN IP Address Indicator", false);

            this.box = new St.BoxLayout({
                vertical: false,
                style: 'padding-left: 5px; padding-right: 5px;'
            });

            this.defaultIcon = new St.Icon({
                icon_name: 'network-wired',
                icon_size: 16,
                style_class: 'system-status-icon'
            });

            this.vpnIcon = new St.Icon({
                icon_name: 'network-vpn',
                icon_size: 16,
                style_class: 'system-status-icon'
            });
            
            this.buttonText = new St.Label({
                text: 'No VPN IP',
                y_align: Clutter.ActorAlign.CENTER,
                style: 'padding-left: 5px; color: white;'
            });

            this.box.add_child(this.defaultIcon);
            this.add_child(this.box);

            debugLog("VPNIPAddressIndicator initialized.");
            this._updateLabel();
        }

        _updateLabel() {
            const priority = 0;
            const refreshTime = 5;

            if (this._timeout) {
                GLib.source_remove(this._timeout);
                this._timeout = undefined;
            }

            this._timeout = GLib.timeout_add_seconds(priority, refreshTime, () => {
                const vpnIp = Utils.getVpnIp();
                debugLog(`VPN Indicator says: ${vpnIp}`);

                if (vpnIp) {
                    this.buttonText.set_text(vpnIp);
                    this.box.remove_child(this.defaultIcon);
                    this.box.add_child(this.vpnIcon);
                    this.box.add_child(this.buttonText);
                    this.connect('button-press-event', () => {
                        St.Clipboard.get_default().set_text(St.ClipboardType.CLIPBOARD, vpnIp);
                        debugLog(`Copied VPN IP to clipboard: ${vpnIp}`);
                    });
                } else {
                    this.buttonText.set_text('No VPN IP');
                    this.box.remove_child(this.vpnIcon);
                    this.box.add_child(this.defaultIcon);
                }

                return GLib.SOURCE_CONTINUE;
            });
        }

        stop() {
            if (this._timeout) {
                GLib.source_remove(this._timeout);
            }
            this._timeout = undefined;
            this.menu.removeAll();
            debugLog("VPNIPAddressIndicator stopped.");
        }
    }
);
