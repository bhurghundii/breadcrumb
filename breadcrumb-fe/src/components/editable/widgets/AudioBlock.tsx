import {useEffect, useState} from "react";
import "./blockstyle.css";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Button} from "@aws-amplify/ui-react";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";
// @ts-ignore
import {AudioRecorder, useAudioRecorder} from "react-audio-voice-recorder";
import putBigBlockAudio from "../../../services/bigblock/putBigBlockAudio.tsx";
import getBigBlockAudio from "../../../services/bigblock/getBigBlockAudio.tsx";
import deleteBigBlockAudio from "../../../services/bigblock/deleteBigBlockAudio.tsx";


export default function AudioBlock({
  text,
  id,
  type,
  tag,
  updateThisBlock,
  deleteThisBlock,
   pageId
}: {
  text: string;
  id: string;
  type: string;
  tag: string;
  updateThisBlock: any;
  deleteThisBlock: any;
    pageId: string
}) {
  const [localaudio, setAudio] = useState<string | null>( null);
  const [isActive, setActive] = useState<boolean | null>( text !== "");
  const [localtag, setTag] = useState(tag ? tag : "");
  const [change, setChange] = useState(false);

    const recorderControls = useAudioRecorder()

    useEffect(() => {
        if (recorderControls.recordingTime > 60) {
            recorderControls.stopRecording()
            toast("Your recording is too long! Wrapped it up for you!", {toastId: "1"});
        }

        // recordingBlob will be present at this point after 'stopRecording' has been called
    }, [recorderControls.recordingTime])

    const addAudioElement = (blob: Blob) => {

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            const base64data = reader.result;

            putBigBlockAudio(id, base64data).then(() => {
                // make sure we dont 404 ourselves every time from here on
                setActive(true);
                setChange(true);
                updateThisBlock(id, "true", type, true, localtag, pageId)
            })

            // @ts-ignore
            setAudio(base64data)

        }


    };

    const handleTagChange = (e: any) => {
        if (e.target.value.length <= 20) {
            e.target.value ? setTag(e.target.value) : null
        } else {
            toast("Your tag is too long. Shorten it down to 20", {toastId: "1"});
        }
        setChange(true);
    };

    function loadAudio (id : string) {
        if (isActive) {
            if (localaudio == null) {
                getBigBlockAudio(id).then((result) => {

                    result?.text().then((body) =>
                    {
                        setAudio(body)
                    })

                })
            }
        }
    }

    loadAudio(id);


    return (
    <div>
      <ToastContainer />

      <div style={{ width: "250px", height: "250px", display: "flex", justifyContent: "center", /* Horizontally center items */
          alignItems: "center"  }}>

          {
               localaudio ? <audio controls src={localaudio} ></audio> :  <AudioRecorder
                   onRecordingComplete={addAudioElement}
                   recorderControls={recorderControls}
                   showVisualizer={true}
                   onNotAllowedOrFound={(err : any) => console.table(err)}
                   downloadOnSavePress={false}
                   mediaRecorderOptions={{
                       audioBitsPerSecond: 128000,
                   }}
               />

          }


      </div>
    <div>
        <div style={{ width: "250px", marginTop: "5px" }}>

            <div style={{ float: "left", marginTop: "5px", textAlign: "center", fontWeight: "bold", flex: "row" }}>
                #
                <input onBlur={() => updateThisBlock(id, "true", type, change, localtag, pageId)} onChange={handleTagChange} value={localtag} className="tag-style" />
            </div>

            <div style={{ float: "right" }}>
                <Button
                    style={{ border: "none" }}
                    onClick={() => {
                        deleteThisBlock(id, pageId)
                        deleteBigBlockAudio(id).then(r => console.log(r))
                    }}
                >
                    <TrashIcon  className="trash-icon" />
                </Button>
            </div>

        </div>
      </div>
    </div>
  );
}
