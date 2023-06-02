import { useState } from 'react'
import {useCandidatesContext} from "../hooks/useCandidatesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const CandidateForm = () => {
  const {dispatch} = useCandidatesContext()
  const {admin} = useAuthContext()

  const [name, setname] = useState('')
  const [nationalNum, setnationalNum ] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setemptyFields] = useState([])


  const handleSubmit = async (e) => {
   
    e.preventDefault()
    // console.log(admin)
    if(!admin){
      setError('you must be logged in')
      return
    }
    const candidate = {name, nationalNum }
    
    const response = await fetch('/api/candidates', {
      method: 'POST',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${admin.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setemptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setname('')
      setnationalNum('')
      setemptyFields([])
      console.log('new candidate added:', json)
      dispatch({type:'CREATE_CANDIDATES', payload : json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Candidate</h3>

      <label>Candidate name:</label>
      <input 
        type="text" 
        onChange={(e) => setname(e.target.value)} 
        value={name}
        className= {emptyFields.includes('name')? 'error': ''}
      />

<label>Candidate nationalNum:</label>
      <input 
        type="text" 
        onChange={(e) => setnationalNum(e.target.value)} 
        value={nationalNum}
        className= {emptyFields.includes('nationalNum')? 'error': ''}
      />

      <button>Add Candidate</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CandidateForm