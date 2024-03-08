import { useState, useCallback } from 'react'

type Match = {
    "matchLevel": number;
    "userInterest": string;
    "matchingRole": string;
}

type Candidate = {
    "firstName": string;
    "lastName": string;
    "email": string;
    "userImage": string;
    "matches": Match[];
}

type CandidateRecord = Record<string, Candidate>;

const OrgMatches: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const [org, setOrg] = useState('')
    const [candidateRecord, setCandidateRecord] = useState<CandidateRecord>({})

    const onClick = useCallback(() => {
            const query = `${process.env.REACT_APP_DB_URL}matches_by_org?org_name=${org}`
            console.log(query)
            fetch(query, {
                method: "GET",
            })
            .then((response) => response.json())
            .then(({ matches }) => {
                console.log(matches)
                setCandidateRecord({})
                const newCandidateRecord: CandidateRecord = {};
                matches.forEach((match: any) => {
                    const matchData = {
                        matchLevel: match.match_level,
                        userInterest: match.user_interest,
                        matchingRole: match.matching_role,
                    }
                    if (newCandidateRecord[match.user_id]){
                        newCandidateRecord[match.user_id].matches.push(matchData)
                    } else {
                        newCandidateRecord[match.user_id] = {
                            firstName: match.first_name,
                            lastName: match.last_name,
                            email: match.email,
                            userImage: match.user_image,
                            matches: [matchData]
                        }
                    }
                })
                setCandidateRecord(newCandidateRecord)
                setHasSearched(true)
            })
            .catch((err) => {
                setCandidateRecord({})
                console.log(err.message);
                setHasSearched(true)
            });
    }, [org])

    return (
        <div>
            <h3>Candidate Search</h3>
            <input  value={org} onChange={e => setOrg(e.target.value)} />
            <button onClick={onClick}>Find Matches</button>
            <div>{(Object.keys(candidateRecord).length === 0 && hasSearched) ? <div> No Results Found </div> :
                    Object.entries(candidateRecord).map(([userId, candidate]) => {
                        return <div key={userId}>
                                {`${candidate.firstName} ${candidate.lastName}`}
                                {candidate.matches.map((match, i) => <li key={i}>{match.matchingRole}, score: {match.matchLevel}</li>)}
                            </div>
                    })
                }
            </div>
        </div>
    )
}

export default OrgMatches