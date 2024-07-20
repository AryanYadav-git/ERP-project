import React, {useState} from 'react'
import { LaySheetForm, LaySheetReport } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const CuttingLaysReports = () => {

  const {laySheetBase, setLaySheetBase} = useStateContext();

  return (
    <div>
        <LaySheetForm />
        {laySheetBase.layLength!=0 && <LaySheetReport/>}
    </div>
  )
}

export default CuttingLaysReports