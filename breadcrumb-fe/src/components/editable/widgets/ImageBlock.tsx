import {useState} from "react";
import "./blockstyle.css";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Button} from "@aws-amplify/ui-react";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";
import putBigBlock from "../../../services/bigblock/putBigBlock.tsx";
import getBigBlock from "../../../services/bigblock/getBigBlock.tsx";
import deleteBigBlock from "../../../services/bigblock/deleteBigBlock.tsx";

export default function ImageBlock({
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
  const [image, setImage] = useState<string | null>( null);
  const [isActive, setActive] = useState<boolean | null>( text !== "");
  const [localtag, setTag] = useState(tag ? tag : "");
  const [change, setChange] = useState(false);

  function getHeight(img : string) {
      const imageT = new Image();
      imageT.src = img
      return imageT.height;
  }
    function getWidth(img : string) {
        const imageT = new Image();
        imageT.src = img
        return imageT.width;
    }

    const handleTagChange = (e: any) => {
        if (e.target.value.length <= 20) {
            e.target.value ? setTag(e.target.value) : null
        } else {
            toast("Your tag is too long. Shorten it down to 20", {toastId: "1"});
        }
        setChange(true);
    };

    function loadImages(id : string) {
        if (isActive) {
            if (image == null) {
                getBigBlock(id).then((result) => {
                    result?.text().then(body => setImage(body));
                })
            }
        }
    }


    loadImages(id)
  return (
    <div>
      <ToastContainer />

      <div style={{ width: "250px", height: "250px", display: "flex", justifyContent: "center", /* Horizontally center items */
          alignItems: "center"  }}>

          {/*@ts-ignore  */}
          {((isActive)) ? (getWidth(image) > getHeight(image) ? <img style={{maxHeight: "250px", borderRadius: 10}} src={image} alt={""} width={250} height={"auto"}/> : <img style={{maxWidth: "250px", borderRadius: 10}} src={image} alt={""} width={"auto"} height={250}/>)
              : <div className="editableBlock">
                  <div className="imageUpload">
                      <input type="file" accept="image/*" onError={() => toast("Something went wrong with the image upload. Make sure it's a PNG / JPG")} onChange={(e) => {
                          if (e.target.files != null) {
                              const file = e.target.files[0];
                              if (file) {

                                  putBigBlock(id, file).then(() => {
                                      // make sure we dont 404 ourselves every time from here on
                                      setActive(true);
                                      setChange(true);
                                      updateThisBlock(id, "true", type, true, localtag)
                                  })

                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                      const result = e.target?.result;
                                      if (typeof result === "string") {
                                          setImage(result);
                                      }
                                  };
                                  reader.readAsDataURL(file);
                              }
                          }
                      }} />
                  </div>
              </div>
          }

      </div>
    <div>
    <div style={{ width: "250px", marginTop: "10px" }}>

        <div style={{ float: "left", marginTop: "5px", textAlign: "center", fontWeight: "bold", flex: "row" }}>
                    #
                <input onBlur={() => updateThisBlock(id, "true", type, change, localtag, pageId)} onChange={handleTagChange} value={localtag} className="tag-style" />
        </div>

        <div style={{ float: "right" }}>
            <Button
                style={{ border: "none" }}
                onClick={() => {
                    deleteThisBlock(id, pageId)
                    deleteBigBlock(id).then(r => console.log(r))
                }
                }
            >
                <TrashIcon  className="trash-icon" />
            </Button>
        </div>

    </div>
      </div>
    </div>
  );
}
