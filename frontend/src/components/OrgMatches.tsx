import { useState, useCallback } from 'react'

type Match = {
    "userId": number;
    "firstName": string;
    "lastName": string;
    "email": string;
    "userImage": string;
    "matchLevel": number;
    "userInterest": string;
    "matchingRole": string;
}

const OrgMatches: React.FC = () => {
    const [org, setOrg] = useState('')
    const [matches, setMatches] = useState<Match[]>([])

    const onClick = useCallback(() => {
            const query = `http://127.0.0.1:8000/matches_by_org?org_name=${org}`
            console.log(query)
            fetch(query, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // todo: use zod to validate the data we get from the backend
                setMatches([])
                setMatches(data.matches.map((match: any) => {
                    return {
                        userId: match.user_id,
                        firstName: match.first_name,
                        lastName: match.last_name,
                        email: match.email,
                        userImage: match.user_image,
                        matchLevel: match.match_level,
                        userInterest: match.user_interest,
                        matchingRole: match.matching_role,
                    }
                }))
            })
            .catch((err) => {
                setMatches([])
                console.log(err.message);
            });
    }, [org])

    return (
        <div>
            <h3>User Search</h3>
            <input  value={org} onChange={e => setOrg(e.target.value)} />
            <button onClick={onClick}>Find Matches</button>
            <div>{(matches.length === 0) ? <div>No Results Found</div> :
                    matches.map((match) => {
                        return <div>{`${match.firstName} ${match.lastName}`}</div>
                    })
                }
            </div>
        </div>
    )
}

export default OrgMatches