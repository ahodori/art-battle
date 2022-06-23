import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

function BattlePage({currentUser, loggedIn}) {
    const [battle, setBattle] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fetch("/battles/"+id)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(json => {
            console.log(json);
            setBattle(json);
        })
    }, [])

    function handleSubmitVote(e, submissionId) {
        e.preventDefault();
        console.log(e);

        fetch("/votes", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                submission_id: submissionId,
                score: parseInt(e.target[0].value)
            })
        })
        .then(res => {
            console.log(res)
            if (res.ok) {

            } else {
                res.json().then((json) => {
                    console.log(json);
                })
            }
        })
    }


    return (<div>
        {Object.keys(battle).length > 0 ?
            <>
                <h1>{battle.name}</h1>
                <h2>{battle.prompt}</h2>
                <h3>{battle.submissions.length} entrants</h3>
                {loggedIn && <button>Submit</button>}
                {currentUser.is_admin && <button>End battle</button>}
                {battle.submissions.map((submission) => {
                    const submission_vote = battle.votes?.find((vote) => vote.submission_id === submission.id)
                    //console.log(submission_vote)

                    return (<div key={submission.id}>
                        <p>{submission.name}</p>
                        <p>{submission.url}</p>
                        <p>By {submission.user.username}</p>
                        {loggedIn &&
                            <form onSubmit={(e) => handleSubmitVote(e, submission.id)}>
                                <label>Vote: 1
                                    {(submission_vote && submission_vote.score) ?
                                            <input type="number" name="score" min="1" max="10" defaultValue={submission_vote.score}/>
                                    :
                                        <input type="number" name="score" min="1" max="10"/>
                                    }
                                    10 
                                </label>
                                <input type="submit" value="Submit vote"></input>
                            </form>
                        }
                        
                    </div>)
                })}
            </>
        :
            <p>Loading battle...</p>    
        }
    </div>)
}

export default BattlePage;