const commentContainer = document.querySelector('#first-comment');

commentContainer.addEventListener('click',function(e){
    debugger
    let closestCommentContainer = e.target.closest('.comment-container');
    console.log(e.target);
    if(e.target.classList.contains('reply')){
        // <div class="comment-reply-container">
            // <input placeholder="Write your Comment" type="text">
            // <button class="btn-submit">Submit</button>
        // </div>
        const commentReplyContainer = document.createElement('div');
        commentReplyContainer.className = 'comment-reply-container';
        commentReplyContainer.innerHTML = ` <input placeholder="Write your Comment" type="text">
                                            <button class="btn-submit">Submit</button>`
                                            
                                            
        console.log(commentReplyContainer);   
        closestCommentContainer.appendChild(commentReplyContainer);                                 
    }else if(e.target.classList.contains('btn-submit')){
        const closestCommentReply = e.target.closest('.comment-reply-container');
        console.log(closestCommentReply);
        const input = closestCommentReply.querySelector('input');
        const value = input.value;
        console.log(value);
        // <div class="comment-container">
        //     <h3>Good Evening Everyone, How are you</h3>
        //     <div class="reply">Reply</div>
        // </div>
        const newComment = document.createElement('div');
        newComment.className = 'comment-container';
        newComment.innerHTML = `<h3>${value}</h3>
                                <div class="reply">Reply</div>`;
                                
                                
                                closestCommentContainer.appendChild(newComment);     
                                closestCommentReply.remove();
    }
})