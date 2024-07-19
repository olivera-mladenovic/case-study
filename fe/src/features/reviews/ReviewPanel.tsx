import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import ReviewList from './ReviewList';
import './styles/reviewPanel.css';
import { CreateReview } from './CreateReviewScreen';
import { MenuBar } from '../menu';


export const ReviewPanel: React.FC = () => {
    const [isCreateReviewShown, setCreateReviewShown] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('Write reviews')

    const changeCreateReviewVisibility = () => setCreateReviewShown(!isCreateReviewShown);

    const changeButtonText = () => {
        if (buttonText === 'Write reviews') setButtonText('Finish writing');
        else setButtonText('Write reviews');
    }
    const onClick = () => {
        changeCreateReviewVisibility();
        changeButtonText();
    } 
   
    return (
        <div>
            <MenuBar></MenuBar>
            <div className='list'>
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
            </div>
        </div>
    )
}