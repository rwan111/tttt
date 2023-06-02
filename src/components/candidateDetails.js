import { useCandidatesContext } from "../hooks/useCandidatesContext"
import { useAuthContext } from "../hooks/useAuthContext"


//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CandidateDetails = ({ candidate })=>{
    const{ dispatch }=useCandidatesContext()
    const { admin } = useAuthContext()

    const handleClick = async()=>{
       // console.log("inside handleclick")
        if(!admin){
            console.log("inside not admin")
            return
        }
        
        const response = await fetch('api/candidates/'+ candidate._id, {
            method:'DELETE',
            headers: {
                'Authorization':`Bearer ${admin.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch ({type:'DELETE_CANDIDATE', payload : json})

        }
    }
    return (
    <div className="candidate-details">
        <h4>{candidate.name}</h4>
        <p><strong>name: </strong>{candidate.name}</p>
        <p><strong>nationalNum: </strong>{candidate.nationalNum}</p>
        <p>{formatDistanceToNow(new Date(candidate.createdAt),{addSuffix:true})}</p>
        <span className ="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    )
}

export default CandidateDetails