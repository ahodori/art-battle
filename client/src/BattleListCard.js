import { Link } from "react-router-dom"

function BattleListCard({battle}) {
    return (<div>
        <Link to={"/battle/"+String(battle.id)}>{battle.name}</Link>
        <p>{battle.num_entrants} entrants</p>
        <p>{battle.is_ended ? battle.winner.name + " wins!" : "battle still going!"}</p>
    </div>)
}

export default BattleListCard