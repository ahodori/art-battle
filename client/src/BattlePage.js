import { useEffect, useState } from "react";
import { Alert, Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

function BattlePage({currentUser, loggedIn}) {
    const [battle, setBattle] = useState({});
    const [showSubmitForm, setShowSubmitForm] = useState(false);

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

    function handleEndBattle(e) {
        e.preventDefault();
        fetch("/endbattle/"+battle.id, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            }}
        )
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then(json => {
                    console.log(json);
                    setBattle(json);
                })
            } else {
                res.json().then(json => console.error(json.error));
            }
        })
    }

    function handleSubmission(e) { 
        e.preventDefault();

        fetch("/submissions", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                battle_id: battle.id,
                name: e.target[0].value,
                url: e.target[1].value
            })
        })
        .then(res => {
            console.log(res)
            if (res.ok) {
                window.location.reload(true);
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
                <Container>
                    <Row>
                        <Col>
                            <h1>{battle.name}</h1>
                            <h2>{battle.prompt}</h2>
                            <h3>{battle.submissions?.length} entrants</h3>

                            {/* Display winner */}
                            {battle.is_ended && Object.keys(battle.winner).length > 0 && <Alert variant="success">
                                    Winner: {battle.winner.name}, by {battle.winner.username}!
                            </Alert>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        {loggedIn && (battle.is_ended == false) && <Button onClick={() => setShowSubmitForm((current) => !current)}>Submit</Button>}
                        </Col>
                        <Col>
                        {currentUser.is_admin && (battle.is_ended == false) && <Button onClick={handleEndBattle}>End battle</Button>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {showSubmitForm && <Form onSubmit={handleSubmission}>
                                    <Form.Group>
                                        <Form.Label>Submission name:</Form.Label>
                                        <Form.Control type="text" name="name"/>         
                                        <Form.Label>Submission URL:</Form.Label>
                                        <Form.Control type="text" name="url"/>
                                        <Button type="submit">Submit picture</Button>
                                    </Form.Group>
                                </Form>}

                            {battle.submissions && battle.submissions.map((submission) => {
                                const submission_vote = battle.votes?.find((vote) => vote.submission_id === submission.id)
                                //console.log(submission_vote)

                                return (<><Card key={submission.id} style={{width: "20rem", padding:"10px"}}>
                                            <Card.Img src={submission.url}/>
                                            <Card.Title>{submission.name}</Card.Title>
                                            <Card.Subtitle>By {submission.user.username}</Card.Subtitle>
                                            <br/>
                                            {loggedIn && battle.is_ended == false &&
                                                <form onSubmit={(e) => handleSubmitVote(e, submission.id)}>
                                                    <label>Vote (1-10):
                                                        {(submission_vote && submission_vote.score) ?
                                                                <input type="number" name="score" min="1" max="10" defaultValue={submission_vote.score}/>
                                                        :
                                                            <input type="number" name="score" min="1" max="10"/>
                                                        }
                                                    </label>
                                                    <input type="submit" value="Submit vote"></input>
                                                </form>
                                            }
                                    </Card><br/></>)
                            })}                        
                        </Col>
                    </Row>
                </Container>

                <div style={{margin: "20px"}}>

                </div>
            </>
        :
            <p>Loading battle...</p>    
        }
    </div>)
}

export default BattlePage;