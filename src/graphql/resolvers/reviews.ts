import Review from '../../models/Review.js';

const Query = {
    Query: {  
        async getReviews(){
            try {
                const reviews = await Review.find();
                return reviews;
            } catch(e) {
                console.log(e);
            }
        }
    }
}

export default Query;