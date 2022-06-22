import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BattlePage() {
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
        })
    }, [])


    return (<div>

    </div>)
}

export default BattlePage;