import { withAuthenticator } from "@aws-amplify/ui-react";
import AppBar from "../../components/editable/core/AppBar.tsx";
import {Button, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import getTagsByUserId from "../../services/blocks/getTagsByUserId.tsx";

function SearchTag({accountId} : {accountId : string}) {

    const [tagArray, setTagArray] = useState([]);

    useEffect(() => {
        var newArray: string[] = []

        getTagsByUserId(accountId).then(tags => {
            // @ts-ignore
            for (var tag of tags) {
                if (!newArray.includes(tag['tag'])) {
                    newArray.push(tag['tag'])
                }
            }

            // @ts-ignore
            setTagArray(newArray)
        })
    }, []);

    return (
        <div style={{ padding: "2%" }}>

            <AppBar />

            <hr style={{borderTop: '1px solid whitesmoke'}}/>

            <div style={{width: "500px", paddingLeft: "20px", marginLeft: "auto", marginRight: "auto"}}>

             <Grid container spacing={2} style={{ paddingTop: "5%" }}>
                 { tagArray.map((tag) =>
                 {
                     return <div>
                         <Grid item xs={12} sm={6} md={4} key={tag}>
                             {/* align the hashtag and the tag variable horizontally in the same button*/}
                             <Button style={{ color: 'black', textTransform: "none" }} href={"/tag/" + tag}><div style={{flex: "row"}}> <b> #{tag}  </b></div></Button>
                         </Grid>
                     </div>
                 })}

             </Grid>
            </div>

        </div>
    );
}

export default withAuthenticator(SearchTag);

