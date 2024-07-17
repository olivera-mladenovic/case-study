import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ReviewList from './ReviewList';
import { useUser } from '../../contexts';


export const ReviewPanel: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    if (!user) {
        console.log('user kog vidim u panelu', user)
        return <h1>Unauthorized</h1>
    }

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
                {/* Here will go the selectedReview Detail */}
                </div>
            </Grid.Column>
        </Grid>
    )
}