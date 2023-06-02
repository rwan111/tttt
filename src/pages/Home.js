import { useEffect} from "react"
import {useCandidatesContext} from "../hooks/useCandidatesContext"
import { useAuthContext} from '../hooks/useAuthContext'

//components
import CandidateDetails from  "../components/candidateDetails"
import CandidateForm from "../components/candidateForm"


const Home = ()=>{

        const {candidates,dispatch}= useCandidatesContext()
        const {admin} = useAuthContext()

        useEffect(()=>{
            const fetchCandidates = async ()=>{
                const response = await fetch('/api/candidates',{
                    headers:{
                        'Authorization':`Bearer ${admin.token}`
                    }
                })
                const json = await response.json()
    
                if (response.ok){
                dispatch({type:'SET_CANDIDATES', payload:json})
                }
            } 
            if(admin){
                fetchCandidates() 
            }
        
        },[dispatch,admin])
        
        return(
            <div className="home">
            <div className="candidates">
            {candidates && candidates.map(candidate => (
            <CandidateDetails candidate={candidate} key={candidate._id} />
            ))}
            </div>
            <CandidateForm />
            </div>
    
        )
    }
export default Home