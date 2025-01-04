import GLib from 'gi://GLib';

export const getVpnIp = () => {
    const vpnInterfaceCommand = "ip tuntap show | cut -d : -f1 | head -n 1 | | cut -d':' -f1";
    const vpnInterfaceBytes = GLib.spawn_command_line_sync(vpnInterfaceCommand)[1];
    const vpnInterface = vpnInterfaceBytes ? String.fromCharCode.apply(null, vpnInterfaceBytes).split(':')[0].trim() : '';

    const ipCommand = `bash -c "ip a s ${vpnInterface} 2>/dev/null | grep -o -P '(?<=inet )[0-9]{1,3}(\\.[0-9]{1,3}){3}'"`;
    const [result, output] = GLib.spawn_command_line_sync(ipCommand);

    const vpnIp = output;

    return new TextDecoder().decode(vpnIp).trim();
};
