import DataPageContext from "../../components/editable/core/DataPageContext.tsx";
import { withAuthenticator } from "@aws-amplify/ui-react";
import {useParams} from "react-router-dom";
import generatePageId from "../../common/generatePageId.tsx";

function TagPage({accountId} : {accountId : string}) {
    let { tag } = useParams();

    let tagId = 0

    if (tag && accountId) {
        tagId = generatePageId(accountId, tag)
    }

    return (
        <div>
            {/* @ts-ignore  */}
            <DataPageContext pageId={tagId.toString()} isTag={true} userId={accountId} tag={tag} />
        </div>
    );
}

export default withAuthenticator(TagPage);

