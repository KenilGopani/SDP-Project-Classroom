import React, { useState } from 'react'
import ClasroomContext from './ClassroomContext'

const ClassroomProvider = (props) => {

    const [currentClassroom, setCurrentClassroom] = useState()

  return (

    <ClasroomContext.Provider value={{currentClassroom, setCurrentClassroom}}>
        {props.children}
    </ClasroomContext.Provider>
  )
}

export default ClassroomProvider