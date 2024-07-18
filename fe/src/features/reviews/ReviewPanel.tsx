import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import ReviewList from './ReviewList';
import { CreateReview } from './CreateReviewScreen';


export const ReviewPanel: React.FC = () => {
    const [isCreateReviewShown, setCreateReviewShown] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('Write review')

    const changeCreateReviewVisibility = () => setCreateReviewShown(!isCreateReviewShown);
    const changeButtonText = () => {
        if (buttonText === 'Write review') setButtonText('Finish writing');
        else setButtonText('Write review');
    }
    const onClick = () => {
        changeCreateReviewVisibility();
        changeButtonText();
    } 
   
    return (
        <Grid>
            <Grid.Column width='10'>
            
                <div style={{width: "100%", height: 50}}>
                    <Button fluid content={buttonText} onClick={onClick} color='brown'/>
                </div>
                {isCreateReviewShown && <CreateReview /> }
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