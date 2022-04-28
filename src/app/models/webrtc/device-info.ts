export class DeviceInfo {

    public deviceId: string;
    public groupId: string;
    public kind: string;
    public label: string;

    constructor(init?: Partial<any>) {
        if (init) {
            this.deviceId = init.deviceId;
            this.groupId = init.groupId;
            this.kind = init.kind;
            this.label= init.label;
        }
    }
}
