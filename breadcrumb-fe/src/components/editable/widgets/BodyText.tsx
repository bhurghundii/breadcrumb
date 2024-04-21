import {useState} from "react";
import "./blockstyle.css";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Button} from "@aws-amplify/ui-react";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";

export default function BodyText({
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
    const LIMIT = 250;
    const [code, setCode] = useState(text);
    const [localtag, setTag] = useState(tag);

    const [change, setChange] = useState(false);

    const handleTagChange = (e: any) => {
        if (e.target.value.length <= 20) {
            e.target.value ? setTag(e.target.value) : null
        } else {
            toast("Your tag is too long. Shorten it down to 20", {toastId: "1"});
        }
        setChange(true);
    };

    const handleTextChange = (e: any) => {
        if (e.target.value.length <= LIMIT) {
            setCode(e.target.value);
        } else {
            toast("Your post is too big. Shorten it or create a new post", {toastId: "1"});
        }
        setChange(true);
    };

    return (
        <div style={{padding: "2%", border: "2px solid whitesmoke", borderRadius: "5%"}}>
            <ToastContainer/>
            <div>
                {code.length > LIMIT ? (
                    <p style={{float: "right", color: "red"}}>
                        {" "}
                        {code.length} / {LIMIT}{" "}
                    </p>
                ) : (
                    <p style={{float: "right"}}>
                        {" "}
                        {code.length} / {LIMIT}{" "}
                    </p>
                )}
            </div>

            <div className="editableBlock" style={{height: 250}}>
        <textarea
            rows={7}
            style={{
                fontSize: "16px",
                width: "100%",
                color: "black",
                backgroundColor: "transparent",
                border: "transparent",
                padding: "2%",
                resize: "none",
            }}
            placeholder={"Write something here"}
            value={code}
            onChange={handleTextChange}
            onBlur={() =>
                updateThisBlock(id, code, type, code.length < LIMIT && change, localtag, pageId)
            }
        />
            </div>

            <div style={{width: "250px", marginTop: "5px"}}>

                <div style={{ float: "left", marginTop: "5px", textAlign: "center", fontWeight: "bold", flex: "row" }}>
                    #
                    <input onBlur={() => updateThisBlock(id, code, type, code.length < LIMIT && change, localtag, pageId)}
                           onChange={handleTagChange} value={localtag} className="tag-style"/>
                </div>

                <div style={{float: "right"}}>
                    <Button
                        style={{border: "none"}}
                        onClick={() => deleteThisBlock(id, pageId)}
                    >
                        <TrashIcon className="trash-icon" />
                    </Button>
                </div>

            </div>
        </div>
    );
}
