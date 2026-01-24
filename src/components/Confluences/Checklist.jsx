import React, { useState } from 'react'
import ChecklistSection from './ChecklistSection'
import ConfluenceSummery from './ConfluenceSummery'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import AddTrade from '../AddTrade'

function Checklist() {
  const [weekly, setWeekly] = useState(0);
  const [daily, setDaily] = useState(0);
  const [fourHour, setFourHour] = useState(0);
  const [entrySignal, setEntrySignal] = useState(0);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const totalConfluence = daily + weekly + fourHour + entrySignal;

   


  return (
    <div className='flex flex-col justify-center items-center py-10 w-full'>
        <div className='mb-5'>
         <h1 className='text-center text-4xl font-sans font-medium'>Trade Confluences</h1>
         <p className='text-center text-xl font-sans font-light'>Select the conditions that are present in your next trade</p>
        </div>
        <ChecklistSection heading={"WEEKLY"} value={weekly} setValue={setWeekly}/>
        <ChecklistSection heading={"DAILY"} value={daily} setValue={setDaily}/>
        <ChecklistSection heading={"4H"} value={fourHour} setValue={setFourHour}/>
        <ChecklistSection heading={"Entry Signal"} value={entrySignal} setValue={setEntrySignal} signal={true}/>
        <ConfluenceSummery weekly={weekly} daily={daily} fourHour={fourHour} entrySignal={entrySignal} totalConfluence={totalConfluence}/>
        <Button children={"Save trade"} onClick={() => setOpen(true)}/>

        <AddTrade open={open} onClose={()=> setOpen(false)} totalConfluence={totalConfluence}/>


    </div>
  )
}

export default Checklist