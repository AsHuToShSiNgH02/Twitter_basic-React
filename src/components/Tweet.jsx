import { useState } from 'react';
import {useMemo} from 'react';
import '../CSS/Tweet.css';
function Tweet({tweetId, content, likeCount, createdAt, onEdit}) {
    const [isEdditing, setIsEditting] = useState(false);

    // const memoizedLikeCount = useMemo(() => likeCount, [likeCount]);
    // const memoizedCreatedAt = useMemo(() => {
    //     const date = new Date(createdAt);
    //     return date.toLocaleString(); // Format date as needed
    // }, [createdAt]);

    return(
        <div className='tweet-wrapper'>
            <div className="tweet-edit-wrapper">
                <div className="tweet-content">
                    {(isEdditing) ? (
                        <input 
                            type='text' 
                            value={content} 
                            onChange={(e) => {
                                onEdit({
                                    id: tweetId,
                                    content: e.target.value,
                                    likeCount: likeCount,
                                    createdAt: createdAt
                                })
                            }}

                        />
                    ) : content}
                </div>
                <div className='edit-tweet'>
                    <button onClick={() => setIsEditting(!isEdditing)}>
                        {(isEdditing) ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
            
            <div className='like-createdAt-wrapper'>
                <div className="likes">
                    {`${likeCount} likes`}
                </div>
                <div className="created-at">
                    <b>Tweeted at</b> {createdAt}
                </div>
            </div>
            
        </div>
    );
}

export default Tweet;