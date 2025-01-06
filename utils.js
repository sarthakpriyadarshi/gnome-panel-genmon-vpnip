import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

Gio._promisify(Gio.Subprocess.prototype, 'communicate_utf8_async');

export const getVpnIp = async () => {
    const vpnInterfaceCommand = ['bash', '-c', "ip tuntap show | cut -d : -f1 | head -n 1 | cut -d':' -f1"];
    const vpnInterfaceProc = new Gio.Subprocess({
        argv: vpnInterfaceCommand,
        flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE,
    });
    vpnInterfaceProc.init(null);
    const [vpnInterfaceOutput] = await vpnInterfaceProc.communicate_utf8_async(null, null);
    const vpnInterface = vpnInterfaceOutput.trim();
    if (!vpnInterface) {
        return '';
    }

    const ipCommand = ['bash', '-c', `ip a s ${vpnInterface} 2>/dev/null | grep -o -P '(?<=inet )[0-9]{1,3}(\\.[0-9]{1,3}){3}'`];
    const ipProc = new Gio.Subprocess({
        argv: ipCommand,
        flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE,
    });
    ipProc.init(null);
    const [ipOutput] = await ipProc.communicate_utf8_async(null, null);

    return ipOutput.trim();
};
