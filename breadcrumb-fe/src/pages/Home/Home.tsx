//@ts-nocheck

import {Button, Container, createTheme, Grid, Typography,} from "@mui/material";
import "./home.css";
import "../../common/common.css";

const Home = () => {

    return (
        <div className="app">
            <Container className="hero">
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} textAlign={"left"}>
                        <div className="hero-grid-item">
                        <Typography variant="h2" component="div" gutterBottom>
                            Breadcrumb
                        </Typography>

                            <br/>
                        <Typography variant={"h3"} gutterBottom>
                            Capture and organise
                            <br />
                            your photos, audio clips and notes
                            <br />
                            using a <span style={{color: "red"}}> #hashtag</span>
                            <br />
                        </Typography>

                            <Button className="hero-button" href="/login">
                                <Typography className="hero-button" variant="h4" component="div" color={"blue"}
                                            gutterBottom>
                                Get started now!
                            </Typography>
                        </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6} className="centered-content-grid-item">
                        <img className="hero-image" height={"100%"} width={"100%"}
                             src={"S3_URLScreenshot+2023-09-22+at+15.52.26.png"}/>
                        <div className="tag-content"> #animalstopaint</div>
                    </Grid>
                </Grid>
            </Container>
            <br />

            <div className="centered-content-no-height">
                <br />
                <Container className="main-content">

                    <Typography variant="h5" gutterBottom>
                        Breadcrumb is a digital scrapbook which lets you organise photos, audio clips and notes using hashtags.
                        <br />
                        <br />

                        Say good bye to clunky albums, having separate apps for different things and endless folders.
                        <br />
                    </Typography>
                    <br />
                    <br />

                    <hr />
                    <div className="centered-content-no-height">
                        <Typography
                            className="centered-content-grid-item"
                            variant="h4"
                            gutterBottom
                        >
                                How it works
                        </Typography>
                    </div>
                </Container>
                <div >
                    <Grid container spacing={2} >
                        <Grid item xs={12} lg={12} className="centered-content-grid-item">
                            <Typography
                                className="centered-content-grid-item"
                                variant="h4"
                                gutterBottom
                            >
                                Step 1: Capture <b> photos, audio clips and notes </b>
                            </Typography>
                            <div>
                                <img
                                    src="S3_URLScreenshot+2023-09-11+at+22.17.00.png"
                                    className="demo-images" height={"90%"} width={"50%"} alt={""}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={12} className="centered-content-grid-item">
                            <br />

                            <Typography
                                className="centered-content-grid-item"
                                variant="h4"
                                gutterBottom
                            >
                                Step 2: Tag using <b> hashtags </b> and rediscover them later!
                            </Typography>
                            <div>
                                <img
                                    src="S3_URLScreenshot+2023-09-11+at+22.17.09.png"
                                    className="demo-images" height={"90%"} width={"50%"} alt={""}/>
                            </div>
                        </Grid>
                    </Grid>

                    <Typography
                        className="centered-content-grid-item"
                        variant="h4"
                        gutterBottom
                    >
                        Seriously, that's it. No AI magic. ✨
                    </Typography>
                </div>

                <br />
                <br />


            </div>


            {/* Footer */}
            <footer className="footer">
                <Container maxWidth="lg">
                    <Typography variant="body1" color="textSecondary">
                        BTW this app is in super early in development, so talk to me on
                        Instagram @bhurghundii with ideas!
                    </Typography>
                    <br />
                    <Typography variant="body1" color="textSecondary">
                        &copy; 2023 Vikram Chhapwale
                    </Typography>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
