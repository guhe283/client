import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { DeviceInfo } from 'src/app/models/webrtc/device-info';
interface SelectedItem{
    name: string,
    code: string
}

@Component({
    selector: 'app-uirouting-section',
    templateUrl: './uirouting-section.component.html',
    styleUrls: ['./uirouting-section.component.scss']

})


export class UiroutingSectionComponent implements OnInit {

    private static LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO = 'scon-webrtc-transmit-local-video';
    private static LOCALSTORAGE_VIDEO_INPUT = 'scon-webrtc-video-input';
    private static LOCALSTORAGE_AUDIO_INPUT = 'scon-webrtc-audio-input';
    private static LOCALSTORAGE_VIDEO_INPUT_VALUES = 'scon-webrtc-video-input-values';


    constructor(private cd: ChangeDetectorRef) {
    
    }

    @ViewChild('localVideoStream', {static: false}) localVideoStream: ElementRef;
    private mediaDeviceInfo: DeviceInfo[];
    public localStorageSourceVideoId: string;
    public localStorageSourceInputAudio: string;
    public localStorageSourceVideo: string;
    public selectedItemVideo: SelectedItem[];
    public selectedItemAudio: SelectedItem[];
    public transmitLocalVideo: boolean;
    public localStream;
    public checkboxDisabled = false;

    async ngOnInit(): Promise<void> {
        this.checkboxDisabled = false;
        this.localStorageSourceVideoId = JSON.parse(localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES))
        this.selectedItemVideo = [];
        this.selectedItemAudio = [];
        this.localStorageSourceInputAudio = localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_AUDIO_INPUT);
        this.localStorageSourceVideo = localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT);
        if (localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === null || (localStorage.getItem('scon-webrtc-transmit-local-video') !== 'false')) {
            localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO, '' + 'true');
            this.transmitLocalVideo = true;
        } else {
            this.transmitLocalVideo = (localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') ? true : false;
        }
        await this.getConnectedDevices();
        await this.streamLocalVideo();
    }

    ngOnDestroy(): void {
        this.terminateVideoStream();
        this.checkboxDisabled = false;
    }

    public async getConnectedDevices(): Promise<any> {
        try {
            // gets local video stream
            await navigator.mediaDevices.getUserMedia({audio: true, video: true});
            this.mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices();

            /*this.selectedItemVideo = this.mediaDeviceInfo.filter(v => v.kind === 'videoinput').map(v => {
                console.log('====================================',v.label);
                console.log('====================================',this.selectedItemVideo);
                const item = {} as SelectedItem;
                item.name = v.label;
                item.code = v.label;
                console.log('====================================',this.selectedItemVideo,'===NAME==',item.name, '===CODE===', item.code);
                return item;
            });*/

            this.selectedItemVideo = this.mediaDeviceInfo.filter(v => v.kind === 'videoinput').map(v => {
                const item = {} as SelectedItem;
                item.name = v.label;
                item.code = v.groupId;
                return item;
            });
        
            
            this.selectedItemAudio = this.mediaDeviceInfo.filter(v => v.kind === 'audioinput').map(v => {
                const item = {} as SelectedItem;
                item.name = v.deviceId;
                item.code = v.label;
                return item;
            });
            const first = this.mediaDeviceInfo.filter(v => v.kind === 'videoinput');
            localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES, '' + JSON.stringify(first[0]));
            if (this.selectedItemVideo.length > 0) {
                if (!this.localStorageSourceVideo || this.localStorageSourceVideo === null) {
                    localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT, '' + this.selectedItemVideo[0].name)
                    this.localStorageSourceVideo = this.selectedItemVideo[0].name;
                }
            }

            if (this.selectedItemAudio.length > 0) {
                if (!this.localStorageSourceInputAudio || this.localStorageSourceInputAudio === null) {
                    localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_AUDIO_INPUT, '' + this.selectedItemAudio[0].name);
                    this.localStorageSourceInputAudio = this.selectedItemAudio[0].name;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    public onAudioChange(event: Event): void {
        localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_AUDIO_INPUT, this.localStorageSourceInputAudio);
    }

    public async onVideoChange(event: Event): Promise<any> {
        console.log('=============================onVideoChange1=============', this.selectedItemVideo[0].name);
        console.log('=============================onVideoChange=2=============', this.localStorageSourceVideo);
        console.log('=============================onVideoChange=3=============', this.localStorageSourceVideo['name']);
        localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT,  this.localStorageSourceVideo['name']);
        const first = this.mediaDeviceInfo.filter(v => v.label === localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT));
       localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES, '' + JSON.stringify(first[0]));
        if (localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
            await this.streamLocalVideo();
        } else {
            await this.terminateVideoStream();
        }
    }

    public async onTransmitLocalVideoChanged(event: Event): Promise<any> {
        this.checkboxDisabled = true;
        this.cd.detectChanges();
        console.log('=========================================VIDEA1', this.transmitLocalVideo);
        console.log('=========================================VIDEA2', this.checkboxDisabled);
        console.log('=========================================VIDEA3', this.transmitLocalVideo);
        localStorage.setItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO, '' + this.transmitLocalVideo);
        if (localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
            await this.streamLocalVideo();
        } else {
            await this.terminateVideoStream();
        }
        this.checkboxDisabled = false;
        this.cd.detectChanges();
        console.log('=========================================VIDEA2', this.checkboxDisabled);
    }

    private async terminateVideoStream(): Promise<any> {
        try {
            if (this.localVideoStream.nativeElement.srcObject !== null) {
                this.localVideoStream.nativeElement.srcObject.getTracks().forEach(track => {
                    track.stop();
                    this.localVideoStream.nativeElement.srcObject.removeTrack(track);
                    this.localVideoStream.nativeElement.srcObject = null;
                });
            }
        } catch (e) {
            console.log(console.log(e));
        }
    }

    public async streamLocalVideo(event ?: any): Promise<any> {
        try {
            this.checkboxDisabled = true;
            this.cd.detectChanges();
            if (localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_TRANSMIT_LOCAL_VIDEO) === 'true') {
                const videoSource = await JSON.parse(localStorage.getItem(UiroutingSectionComponent.LOCALSTORAGE_VIDEO_INPUT_VALUES)).deviceId;
                const constraints = {
                    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
                };
                await navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream => {
                        this.localStream = this.localVideoStream.nativeElement.srcObject = stream
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            this.checkboxDisabled = false;
            this.cd.detectChanges();
        } catch
            (e) {
            console.log(e);
        }
    }
}
