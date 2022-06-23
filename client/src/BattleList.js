import { useEffect, useState } from "react";
import BattleListCard from "./BattleListCard";

function BattleList() {
    const [battleArray, setBattleArray] = useState([]);
    const [errorDisplay, setErrorDisplay] = useState("");

    useEffect(() => {
        fetch("/battles")
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(json => {
            console.log(json);
            setBattleArray(json);
        })
    }, [])

    return (<div>
        {battleArray.length > 0 ?
            (battleArray.map((battle) => {
                return <BattleListCard battle={battle}/>
            }))
        :
            (<p>Loading...</p>)
        }
    </div>)
}

export default BattleList;