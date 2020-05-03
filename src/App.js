import React from "react";
import { Grid } from '@material-ui/core';
import youtube from './api/youtube'
import { SearchBar, VideoDetail, VideoList } from './components'
class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }
    onVideoSelect = (video) => {
this.setState({selectedVideo: video})
    }
    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyDBbmj5oBaSj5YNEE-WZ6obZxj1O6r5qxQ',
                q: searchTerm,
            }
        })
        console.log(response.data.items)
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }
    render() {
        const { selectedVideo, videos } = this.state;
        return (
            <Grid justify='center' container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid style={{ marginTop: '-45px', height: '700px' }} item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>

                        <Grid style={{ marginTop: '-35px', maxHeight: '620px', overflowY: 'auto' }} item xs={4}>
                            <VideoList onVideoSelect={this.onVideoSelect} videos={videos} />
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
        );
    }
}
export default App;
