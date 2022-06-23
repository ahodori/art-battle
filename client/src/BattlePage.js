import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BattlePage({currentUser}) {
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
                {currentUser.is_admin && <button>End battle</button>}
                {battle.submissions.map((submission) => {
                    return (<div key={submission.id}>
                        <p>{submission.name}</p>
                        <p>{submission.url}</p>
                        <p>By {submission.user.username}</p>
                    </div>)
                })}
            </>
        :
            <p>Loading battle...</p>    
        }
    </div>)
}

export default BattlePage;