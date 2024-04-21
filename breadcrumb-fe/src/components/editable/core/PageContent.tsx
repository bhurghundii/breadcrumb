import {Button, Grid, Typography} from "@mui/material";
import KeyValueStore from "./KeyValueStore.tsx";
import PageGridBlockItem from "./PageGridBlockItem.tsx";
import {v4 as uuidv4} from "uuid";
import {ChatBubbleBottomCenterTextIcon, MicrophoneIcon, PhotoIcon} from "@heroicons/react/20/solid";
import {toast} from "react-toastify";

type PageContentType = {
  keyValueStore: KeyValueStore<number, string> ;
  createBlock: any;
  deleteThisBlock: any;
  updateThisBlock: any;
}

export default function PageContent(pageContentType : PageContentType) {
    const pageSize = pageContentType.keyValueStore.values().length;
    const MAX_PAGE_SIZE = 15;
  return (
    <div>

      <Grid container spacing={2} style={{ paddingTop: "5%" }}>
        {pageContentType.keyValueStore.values().map((value: string) => {
            return <PageGridBlockItem key={uuidv4()} blockJSON={JSON.parse(value)} updateThisBlock={pageContentType.updateThisBlock} deleteThisBlock={pageContentType.deleteThisBlock} />

        })}
      </Grid>


        {pageContentType.keyValueStore.values().length == 0 ? <div style={{paddingTop: "5%"}} >
            <Grid item xs={12} sm={12}  textAlign={"center"}>
                <Typography
                    className="centered-content-grid-item"
                    variant="body1"
                    gutterBottom
                >
                    You haven't added anything today.
                </Typography>
                <Typography
                    className="centered-content-grid-item"
                    variant="body1"
                    gutterBottom
                >
                    Click something below to get started
                </Typography>
            </Grid>
        </div> : null}

        <div style={{paddingTop: "2%"}}>
            <div style={{borderRadius: 10, border: "2px solid gray", width: "200px", marginLeft: "auto", marginRight: "auto"}}>

                <Button onClick={() => (pageSize < MAX_PAGE_SIZE) ? pageContentType.createBlock("Text") : toast("Way too many posts today for me to handle without charging you!")}>
                    <ChatBubbleBottomCenterTextIcon style={{color: "gray"}} width={25} height={25}/>
                </Button>

                <Button onClick={() => (pageSize <  MAX_PAGE_SIZE) ? pageContentType.createBlock("Image") : toast("Way too many posts today for me to handle without charging you!")}>
                    <PhotoIcon style={{color: "gray"}} width={25} height={25}/>
                </Button>


                <Button onClick={() => (pageSize <  MAX_PAGE_SIZE) ? pageContentType.createBlock("Audio") : toast("Way too many posts today for me to handle without charging you!")}>
                    <MicrophoneIcon style={{color: "gray"}} width={25} height={25}/>
                </Button>

            </div>
      </div>
    </div>
  );
}
