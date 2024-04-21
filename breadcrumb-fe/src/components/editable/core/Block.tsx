import BodyText from "../widgets/BodyText";
import ImageBlock from "../widgets/ImageBlock.tsx";
import AudioBlock from "../widgets/AudioBlock.tsx";

type BlockType = {
    text: string;
    blockId: string;
    type: string;
    tag: string
    updateThisBlock: any;
    deleteThisBlock: any;
    pageId: string
}
export default function Block(blockType: BlockType ) {
  return (
    <div
      style={{
        width: "250px",
        height: "250px",
      }}
    >
          {blockType.type === "Text" ? (
            <BodyText
              text={blockType.text}
              id={blockType.blockId}
              type={blockType.type}
              tag={blockType.tag}
              updateThisBlock={blockType.updateThisBlock}
              deleteThisBlock={blockType.deleteThisBlock}
              pageId={blockType.pageId}
            />
          ) : null}

        {blockType.type === "Image" ? (
            <ImageBlock
                text={blockType.text}
                id={blockType.blockId}
                type={blockType.type}
                tag={blockType.tag}
                updateThisBlock={blockType.updateThisBlock}
                deleteThisBlock={blockType.deleteThisBlock}
                pageId={blockType.pageId}
            />
        ) : null}

        {blockType.type === "Audio" ? (
            <AudioBlock
                text={blockType.text}
                id={blockType.blockId}
                type={blockType.type}
                tag={blockType.tag}
                updateThisBlock={blockType.updateThisBlock}
                deleteThisBlock={blockType.deleteThisBlock}
                pageId={blockType.pageId}
            />
        ) : null}

    </div>
  );
}
