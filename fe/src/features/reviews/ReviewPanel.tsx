import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
//import {EventList} from '../list';
//import { EventDetails } from '../details';
import { useNavigate } from 'react-router-dom';
import ReviewList from './ReviewList';


export const ReviewPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Grid>
            <Grid.Column width='10'>
            
                <div style={{width: "100%", height: 50}}>
                    <Button fluid content="Write review" onClick={()=> navigate('/create-review')} positive/>
                </div>   
                <ReviewList/>
            
            </Grid.Column>
            <Grid.Column width="6">
                <div>
                {/* <EventDetails/> */}
                </div>
            </Grid.Column>
        </Grid>
    )
}