import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function BattleListCard({battle}) {
    return (<Card>
        <Card.Body>
            <Card.Title><Link to={"/battle/"+String(battle.id)}>{battle.name}</Link></Card.Title>
            <Card.Subtitle>{battle.num_entrants} entrants</Card.Subtitle>
            <p>{battle.is_ended ? battle.winner.name + " wins!" : "Battle still going!"}</p>
        </Card.Body>
    </Card>)
}

export default BattleListCard