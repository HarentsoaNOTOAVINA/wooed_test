interface TypesAudioRecorder {
    start: Function;
    stop: Function;
    stopStream: Function;
    cancel: Function;
    resetRecordingProperties: Function;
    streamBeingCaptured?: any;
    mediaRecorder?: MediaRecorder | null;
    audioBlobs?: Array<any>;
}

export const AudioRecorder: TypesAudioRecorder = {
    start(): Promise<any> {
        /**
         * DEVICES DETECTION
         */
        // !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia())
        if (
            !(navigator.mediaDevices)
        ) {
            /**
             * API is not supported
             */
            return Promise.reject(new Error('NOT_SUPPORTED'));
        } else {
            /**
             * API is supported
             */
            return navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    //save the reference of the stream to be able to stop it when necessary
                    AudioRecorder.streamBeingCaptured = stream;

                    //create a media recorder instance by passing that stream into the MediaRecorder constructor
                    AudioRecorder.mediaRecorder = new MediaRecorder(stream);

                    //clear previously saved audio Blobs, if any
                    AudioRecorder.audioBlobs = [];

                    //add a dataavailable event listener in order to store the audio data Blobs when recording
                    AudioRecorder.mediaRecorder.addEventListener(
                        'dataavailable',
                        (event) => {
                            //store audio Blob object
                            AudioRecorder.audioBlobs?.push(event.data);
                        }
                    );

                    //start the recording by calling the start method on the media recorder
                    AudioRecorder.mediaRecorder.start();
                }).catch(function (error) {
                    console.error('Error accessing media devices.', error);
                });
        }
    },

    stop() {
        //return a promise that would return the blob or URL of the recording
        return new Promise((resolve) => {
            //save audio type to pass to set the Blob type
            let mimeType = AudioRecorder.mediaRecorder?.mimeType;

            //listen to the stop event in order to create & return a single Blob object
            AudioRecorder.mediaRecorder?.addEventListener('stop', () => {
                //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
                let audioBlob = new Blob(AudioRecorder.audioBlobs, {
                    type: mimeType,
                });

                //resolve promise with the single audio blob representing the recorded audio
                resolve(audioBlob);
            });

            //stop the recording feature
            AudioRecorder.mediaRecorder?.stop();

            //stop all the tracks on the active stream in order to stop the stream
            AudioRecorder.stopStream();

            //reset API properties for next recording
            AudioRecorder.resetRecordingProperties();
        });
    },

    /**
     * Stop all the tracks on the active stream in order to stop the stream and remove
     * the red flashing dot showing in the tab
     */
    stopStream() {
        //stopping the capturing request by stopping all the tracks on the active stream
        AudioRecorder.streamBeingCaptured
            .getTracks()
            .forEach((track: any) => track.stop());
    },

    cancel() {
        AudioRecorder.mediaRecorder?.stop();

        //stop all the tracks on the active stream in order to stop the stream
        AudioRecorder.stopStream();

        //reset API properties for next recording
        AudioRecorder.resetRecordingProperties();
    },

    resetRecordingProperties() {
        AudioRecorder.mediaRecorder = null;
        AudioRecorder.streamBeingCaptured = null;
    },
};
