import TweetList from './TweetList';
import AddTweet from './AddTweet';
import {memo} from 'react';
import { useState, useCallback } from 'react';

const initialDummyTweets = [
    {id: 0, content: "this is my first tweet on twitter", likeCount:3, createdAt: new Date()},
    {id: 1, content: "What should we post ??", likeCount:2, createdAt: new Date()},
    {id: 2, content: "What is up with tech community", likeCount:4, createdAt: new Date()},
];

const MemoisedAddTweet = memo(AddTweet);
function Twitter() {
    const [tweets, setTweets] = useState(initialDummyTweets)
    const handleAndTweet = useCallback((text) => {
        let nextId = (tweets.length > 0) ? tweets[tweets.length - 1].id + 1 : 0 ;
        setTweets([...tweets, {
            content: text,
            likeCount: Math.floor(Math.random()*10), //random like count
            id:nextId,
            createdAt: new Date()
        }]);
    },[tweets]);

    const handleEditTweet = useCallback((tweet) => {
        setTweets(
            tweets.map((currentTweet) => {
                if(currentTweet.id === tweet.id){
                    return tweet;
                }else{
                    return currentTweet;
                }
            })
        )
    },[tweets]);

    const sortTweets = useCallback(() => {
        tweets.sort((t1,t2) => {
            const date1 = new Date(t1.createdAt);
            const date2 = new Date(t2.createdAt);
            return date2.getTime() - date1.getTime();
        });
        setTweets([...tweets]);
    },[tweets]);
    
    return (
        <>
            <MemoisedAddTweet onAddTweet={handleAndTweet}/>
            <button onClick={sortTweets}>
                Sort Tweet By CreatedAt
            </button>
            <TweetList tweets={tweets} onEditTweet={handleEditTweet} />
        </>
      );
}

export default Twitter;