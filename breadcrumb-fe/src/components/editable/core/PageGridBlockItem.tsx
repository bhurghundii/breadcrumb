import Block from "./Block.tsx";
import {Grid} from "@mui/material";

type PageGridBlockItemType = {
    blockJSON : any
    updateThisBlock : any
    deleteThisBlock: any
}

export default function PageGridBlockItem(pageGridBlockItemType: PageGridBlockItemType) {

    return (
        <Grid item xs={6} sm={2} className="stickyNotesHome" key={pageGridBlockItemType.blockJSON.id}>
            <Block
            text={pageGridBlockItemType.blockJSON.title}
            blockId={pageGridBlockItemType.blockJSON.id}
            type={pageGridBlockItemType.blockJSON.type}
            tag={pageGridBlockItemType.blockJSON.tag}
            updateThisBlock={pageGridBlockItemType.updateThisBlock}
            deleteThisBlock={pageGridBlockItemType.deleteThisBlock}
            pageId={pageGridBlockItemType.blockJSON.pageId}
            />
        </Grid>
    )
}