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


    return (<div>
        {Object.keys(battle).length > 0 ?
            <>
                <h1>{battle.name}</h1>
                <h2>{battle.prompt}</h2>
                <h3>{battle.submissions.length} entrants</h3>
                {loggedIn && <button>Submit</button>}
                {currentUser.is_admin && <button>End battle</button>}
                {battle.submissions.map((submission) => {
                    return (<div key={submission.id}>
                        <p>{submission.name}</p>
                        <p>{submission.url}</p>
                        <p>By {submission.user.username}</p>
                        {loggedIn &&
                            <form>
                                <label>Vote: 1
                                    {range(1,10,1).map((value) => <input type="radio" name="score" value={value}/>)}
                                    10
                                </label>
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