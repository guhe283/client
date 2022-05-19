import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeviceInfo } from 'src/app/models/webrtc/device-info';
interface SelectItem {
    name: string,
    code: string
}



@Component({
    selector: 'app-media-section',
    templateUrl: './media-section.component.html',
    styleUrls: ['./media-section.component.scss'],
})
export class MediaSectionComponent implements OnInit, OnDestroy {
    private static LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO = 'scon-webrtc-transmit-local-video';
    private static LOCALSTORAGE_VIDEO_INPUT = 'scon-webrtc-video-input';
    private static LOCALSTORAGE_AUDIO_INPUT = 'scon-webrtc-audio-input';
    private static LOCALSTORAGE_VIDEO_INPUT_VALUES = 'scon-webrtc-video-input-values'

    constructor(private cd: ChangeDetectorRef) {
    }

    @ViewChild('localVideoStream', { static: false }) localVideoStream: ElementRef;
    private mediaDeviceInfo: DeviceInfo[];
    public localStorageSourceVideoId: string;
    public localStorageSourceInputAudio: string;
    public localStorageSourceVideo: string;
    public selectedVideo: SelectItem;
    public selectedItemVideo: SelectItem[];
    public selectedItemAudio: SelectItem[];
    public transmitLocalVideo: boolean;
    public localStream;
    public checkboxDisabled = false;
    private destroyed = false;

    async ngOnInit(): Promise<void> {
        try {
            this.checkboxDisabled = false;
            this.selectedItemVideo = [];
            this.selectedItemAudio = [];
            this.localStorageSourceInputAudio = localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_AUDIO_INPUT);
            this.localStorageSourceVideo = localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT);
            this.localStorageSourceVideoId = JSON.parse(localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES));
            if (localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === null || (localStorage.getItem('scon-webrtc-transmit-local-video') !== 'false')) {
                localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO, '' + 'true');
                this.transmitLocalVideo = true;
            } else {
                this.transmitLocalVideo = (localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') ? true : false;
            }
            await this.getConnectedDevices();
            if (this.mediaDeviceInfo !== null && this.mediaDeviceInfo.length > 0) {
                const init = this.mediaDeviceInfo.filter(v => v.label === localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT));
                localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES, '' + JSON.stringify(init[0]));
                await this.streamLocalVideo();
            }
        } catch (e) {
            console.log('ERROR => ngOnInit', e)
        }
    }

    async ngOnDestroy(): Promise<void> {
        try {
            this.destroyed = true;
            if ((localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO)) !== 'true') {
                await this.terminateVideoStream();
            }
            this.checkboxDisabled = false;
        } catch (e) {
            console.log('ERROR => ngOnDestroy', e)
        }
    }

    public async getConnectedDevices(): Promise<any> {
        try {
            // gets local video stream
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            this.mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices();
            if (this.mediaDeviceInfo !== null && this.mediaDeviceInfo.length > 0) {
                this.selectedItemVideo = this.mediaDeviceInfo.filter(v => v.kind === 'videoinput').map(v => {
                    const item = {} as SelectItem;
                    item.name = v.label;
                    item.code = v.label;
                    return item;
                });
            }
            if (this.mediaDeviceInfo.length !== null && this.mediaDeviceInfo.length > 0) {
                this.selectedItemAudio = this.mediaDeviceInfo.filter(v => v.kind === 'audioinput').map(v => {
                    const item = {} as SelectItem;
                    item.name = v.deviceId;
                    item.code = v.label;
                    return item;
                });
            }
            // Set local storage
            const first = this.mediaDeviceInfo.filter(v => v.kind === 'videoinput');
            localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES, '' + JSON.stringify(first[0]));
            if (this.selectedItemVideo !== null && this.selectedItemVideo.length > 0) {
                if (!this.localStorageSourceVideo || this.localStorageSourceVideo === null) {
                    localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT, '' + this.selectedItemVideo[0].name)
                    this.localStorageSourceVideo = this.selectedItemVideo[0].name;
                }
            }
            if (this.selectedItemAudio !== null && this.selectedItemAudio.length > 0) {
                if (!this.localStorageSourceInputAudio || this.localStorageSourceInputAudio === null) {
                    localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_AUDIO_INPUT, '' + this.selectedItemAudio[0].name);
                    this.localStorageSourceInputAudio = this.selectedItemAudio[0].name
                }
            }
        } catch (e) {
            console.log('ERROR => getConnectedDevice', e)
        }
    }

    public onAudioChange(event: Event): void {
        localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_AUDIO_INPUT, this.localStorageSourceInputAudio);
    }

    public async onVideoChange(event: Event): Promise<void> {
        localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT, this.selectedVideo.name);
        
        const first = this.mediaDeviceInfo.filter(v => v.label === localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT));
        localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES, '' + JSON.stringify(first[0]));
        if (localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
            await this.streamLocalVideo();
        } else {
            await this.terminateVideoStream();
        }
    }

    public async onTransmitLocalVideoChanged(event: Event): Promise<void> {
        this.checkboxDisabled = true;
        this.triggerChangeDetection();
        localStorage.setItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO, '' + this.transmitLocalVideo);
        if (localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
            await this.streamLocalVideo();
        } else {
            await this.terminateVideoStream();
        }
        this.checkboxDisabled = false;
        this.triggerChangeDetection();
    }

    private async terminateVideoStream(): Promise<any> {
        try {
            if (this.localVideoStream.nativeElement.srcObject !== null) {
                await this.localVideoStream.nativeElement.srcObject.getTracks().forEach(track => {
                    track.stop();
                    this.localVideoStream.nativeElement.srcObject.removeTrack(track);
                    this.localVideoStream.nativeElement.srcObject = null;
                });
            }
        } catch (e) {
            console.log(console.log('ERROR => Terminate Video', e));
        }
    }

    public async streamLocalVideo(event?: any): Promise<any> {
        try {
            if (localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
                await this.terminateVideoStream();
                const videoSource = await JSON.parse(localStorage.getItem(MediaSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES)).deviceId;
                const constraints = {
                    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
                };
                await navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream => {
                        this.localStream = this.localVideoStream.nativeElement.srcObject = stream;
                    })
                    .catch(error => {
                        console.log('ERROR => Stream Video', error);
                    })
            } else {
                this.localVideoStream.nativeElement.srcObject = null;
            }
        } catch
        (e) {
            console.log('ERROR => Stream Video', e);
        }
    }

    triggerChangeDetection() {
        if (!this.destroyed) {
            this.cd.detectChanges();
        }
    }
}
