Using:
```sh
import WebCam from 'vue-webcam-new';

// Register component
... components: { "web-cam": WebCam } ...

// Component
<web-cam
    :webcamProperties="webcamProps"
    @getWebcamPics="getFiles"
></web-cam>
<v-btn @click="clickSendFiles()"></v-btn>

// Setup properties
webcamProps: {
    pictureWidth: 1280,
    pictureHeight: 720,
    autoUpload: false,
    hidePreview: false,
    showSubmitButton: true,
    notPictureTypeFilesPreview: '',
    allowManualFileUploads: false,
    webcamOnly: false,
    ajaxSettings: {
        url: '',
        method: 'POST',
        additionalData: '',
        headers: {}
    }
}

// Functions
export default {
    ...
        methods: {
            // File Change Listener. Returns array with all files when you make shot
            getFiles(files) {
               console.log(files);
            },
            // Submit data to server.
            clickSendFiles: function() {
                this.$emit('sendData')
            }
        }
    ...
}

```