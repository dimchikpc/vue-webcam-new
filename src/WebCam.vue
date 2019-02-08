<template>
    <div>
        <div class="grid-row" v-if="webcamProps.allowManualFileUploads">
            <input type="file" id="webcampick" ref="webcampick" multiple @change="handleFilesUpload()"/>
        </div>
        <div class="grid-container grid-container--fit">
            <div class="grid-element webcampick-preview">
                <video id="video" class="webcampick-width" autoplay></video>
                <button @click="takeImage()" class="make-photo-btn">
                    Take picture
                </button>
                <canvas id="canvas" hidden></canvas>
            </div>
            <div class="grid-element" v-if="!webcamProps.webcamOnly && !webcamProps.hidePreview">
                <div v-if="files.length">
                    <div v-if="src !== ''">
                        <img :src="src" alt="" class="webcampick-width">
                    </div>

                    <div v-if="webcamProps.notPictureTypeFilesPreview === '' && src === ''">
                        <p>You can not open the preview file of this format!</p>
                    </div>
                </div>
            </div>
            <div class="grid-element shots-list" v-if="!webcamProps.webcamOnly">
                <ul v-if="files.length">
                    <li v-for="(file, key) in files" :key="key" @click="readURL(file)">
                        {{ file.name }}
                        <button @click.stop="removeFile( key )" class="remove">
                            remove
                        </button>
                    </li>
                </ul>
                <div class="submit-container" v-if="webcamProps.showSubmitButton && files.length">
                    <button @click.stop="uploadToServer()" class="submit-button">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: [
            'webcamProperties'
        ],
        name: 'web-cam',
        data: () => {
            return {
                files: [],
                properties: null,
                showCam: true,
                canvas: null,
                context: null,
                video: null,
                defaultFilename: 'picture',
                constraints: {
                    video: true
                },
                src: '',
                defaultHeaders: {
                    'Accept': 'application/json'
                },
                webcamProps: {
                    pictureWidth: 1280,
                    pictureHeight: 720,
                    autoUpload: false,
                    hidePreview: false,
                    showSubmitButton: false,
                    notPictureTypeFilesPreview: '',
                    allowManualFileUploads: false,
                    webcamOnly: false,
                    ajaxSettings: {
                        url: '',
                        method: 'POST',
                        additionalData: '', // tol'ko json format
                        headers: {}
                    }
                }
            }
        },
        mounted(){
            this.webcamProps = Object.assign(this.webcamProps, this.webcamProperties);
            this.enableWebcam();
        },
        methods: {
            handleFilesUpload() {
                let uploadedFiles = this.$refs.webcampick.files;
                for( var i = 0; i < uploadedFiles.length; i++ ){
                    this.files.push( uploadedFiles[i] );
                }
                this.filesUpdate();
            },
            removeFile( key ){
                this.files.splice( key, 1 );
                this.filesUpdate();
            },
            enableWebcam(){
                this.showCam = true;

                this.canvas = document.getElementById('canvas');
                this.context = this.canvas.getContext('2d');
                this.video = document.getElementById('video');

                navigator.getMedia = ( navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

                navigator.getMedia({
                    video: {
                        width: { ideal: this.webcamProps.pictureWidth },
                        height: { ideal: this.webcamProps.pictureHeight }
                    }
                    }, () => {
                    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
                        this.video.srcObject = stream;
                        this.video.play();
                    })
                }, () => {
                    this.showCam = false;
                });
            },
            takeImage(){
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.context.drawImage(video, 0, 0);
                let dataURL = canvas.toDataURL("image/png");

                let file = this.dataURLtoFile(dataURL, this.defaultFilename + '.png');
                this.files.push(file);
                this.readURL(file);
                this.filesUpdate();
                if(this.webcamProps.autoUpload) this.uploadToServer();
            },
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type:mime});
            },
            filesUpdate: function() {
                this.$emit("getWebcamPics", this.files);
            },
            readURL(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    if(e.target.result.match('image/*')){
                        this.src = e.target.result;
                    }else{
                        this.src = this.webcamProps.notPictureTypeFilesPreview;
                    }
                };
                reader.readAsDataURL(file);
            },
            uploadToServer(){
                let formData = new FormData();

                if(this.files.length){
                    for( let i = 0; i < this.files.length; i++ ){
                        let file = this.files[i];
                        formData.append('files[' + i + ']', file);
                    }
                }
                formData.append('additional', this.webcamProps.ajaxSettings.additionalData);

                this.defaultHeaders = Object.assign(this.webcamProps.ajaxSettings.headers, this.defaultHeaders);

                fetch(this.webcamProps.ajaxSettings.url, {
                    headers: this.defaultHeaders,
                    method : this.webcamProps.ajaxSettings.method,
                    body: formData,
                }).then(
                    response => {return response}
                ).then(
                    html => console.log(html)
                );
            },
            IsJsonString(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
        },
        created: function() {
            this.$parent.$on('sendData', () => {
                return this.uploadToServer();
            });
        }
    }
</script>

<style scoped>
    .webcampick-width{
        width: 100%;
    }
    .grid-row{
        padding: 20px;
    }
    .grid-container {
        display: grid;
    }
    .grid-container--fit {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    .grid-element {
        position: relative;
        padding: 20px;
    }
    .shots-list ul{
        padding: 0px;
        border: 1px solid #78909C;
    }
    .shots-list ul li{
        cursor: pointer;
        list-style-type: none;
        padding: 10px;
    }
    .shots-list ul li:hover{
        background: #ECEFF1;
    }
    .shots-list .remove{
        float: right;
    }
    .make-photo-btn{
        color: #fff;
        position: absolute;
        margin-top: 0;
        top: 20px;
        left: 20px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.4);
        border-bottom-right-radius: 10px;
    }
    .make-photo-btn:hover{
        background: rgba(0, 0, 0, 0.5);
    }
    .submit-container{
        padding: 10px 0 10px 10px;
        text-align: right;
    }
    .submit-button{
        padding: 5px 15px;
        color: #fff;
        background: #2196F3;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }
</style>