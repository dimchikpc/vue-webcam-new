# vue-webcam-new


### Installation
```sh
$ npm i vue-webcam
```

### Basic usage
```sh
import WebCam from 'vue-webcam-new';
```

```sh
export default {
    ...
        components:{
            WebCam
        },
    ...
}
```

```sh
<template>
    <WebCam
        :webcamProperties="webCamProperties"
        @getWebcamPics="yourMethodHere"
    ></WebCam>
</template>
```

### Property object
```sh
webCamProperties: {
    pictureWidth: 1280,
    pictureHeight: 720,
    autoUpload: false,
    hidePreview: false,
    showSubmitButton: false,
    notPictureTypeFilesPreview: '',
    allowManualFileUploads: false,
    webcamOnly: true,
    ajaxSettings: {
        url: '',
        method: 'POST',
        additionalData: '',
        headers: {}
    }
}
```

### Functions & Events
<table>
    <thead>
        <tr>
            <th style="text-align: left; font-size: 14px; width:30%">name</th>
            <th style="text-align: left; font-size: 14px; width:70%">using</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="1">
                getWebcamPics
            </td>
            <td colspan="1">
                <pre style="margin-bottom:0">@getWebcamPics="yourMethodHere"</pre>
                On any changes ( take a picture / upload / delete file ), the method returns an array of files:
                <pre style="margin-bottom:0">methods: { <br> &nbsp; &nbsp; yourMethodHere(files) { <br>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;console.log(files); <br>&nbsp; &nbsp;&nbsp; }<br>}</pre>
            </td>
        </tr>
        <tr>
            <td colspan="1">
                sendData 
            </td>
            <td colspan="1">
                Custom submit button
                <pre style="margin-bottom:0">@click="$emit('sendData')"</pre>
            </td>
        </tr>
    </tbody>
</table>
    

### Description of properties

<table>
    <thead>
        <tr>
            <th style="text-align: left; font-size: 14px; width:30%">name</th>
            <th style="text-align: left; font-size: 14px; width:70%">default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan=1><span style="color: #E57373 "> pictureWidth </span> </td>
            <td colspan=1> 1280 </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px"> 
            Width of returned picture. An ideal value, when used, has gravity, which means that the browser will try to find the setting (and camera, if you have more than one), with the smallest fitness distance from the ideal values given. 
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> pictureHeight </span> </td>
            <td colspan=1> 720 </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            Height of returned picture. An ideal value, when used, has gravity, which means that the browser will try to find the setting (and camera, if you have more than one), with the smallest fitness distance from the ideal values given. 
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> webcamOnly </span> </td>
            <td colspan=1> false </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            will show webcam stream only
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> autoUpload </span> </td>
            <td colspan=1> false </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            Automatically upload files to the server on **make picture / upload picture**
By ajax settings defined in **ajaxSettings** object
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> ajaxSettings.url </span> </td>
            <td colspan=1> undefined </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            is the server URL that will be used for the request
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> ajaxSettings.method </span> </td>
            <td colspan=1> 'POST' </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            is the request method to be used when making the request
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> ajaxSettings.additionalData  </span> </td>
            <td colspan=1> undefined </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            additional data in json which will passed with files
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> ajaxSettings.headers </span> </td>
            <td colspan=1> <pre style="margin-bottom: 0">
{ 
    'Accept': 'application/json' 
}</pre> </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            custom headers to be sent
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> showSubmitButton </span> </td>
            <td colspan=1> false </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            will show submit button under picture list
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> allowManualFileUploads </span> </td>
            <td colspan=1> false </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            will show file input for manually files upload
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> notPictureTypeFilesPreview  </span> </td>
            <td colspan=1> undefined </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            url link to image which will be a placeholder for no images file type. Will shown in a preview section
            </td>
        </tr>
        <tr>
            <td colspan=1><span style="color: #E57373 "> hidePreview </span> </td>
            <td colspan=1> false </td>
        </tr>
        <tr>
            <td colspan=2 style="font-size: 12px;"> 
            will hide a preview
            </td>
        </tr>
    </tbody>
</table>

### Git Repository

GitHub &nbsp; [https://github.com/dimchikpc/vue-webcam-new](https://github.com/dimchikpc/vue-webcam-new)






















