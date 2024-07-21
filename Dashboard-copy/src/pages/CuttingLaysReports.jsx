import React, {useEffect, useState} from 'react'
import { LaySheetForm, LaySheetReport } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const CuttingLaysReports = () => {

  const {laySheetBase, setLaySheetBase, laySheetReport} = useStateContext();

  useEffect(() => {
    console.log(laySheetReport);
  }, [laySheetReport])

  return (
    <div>
        <LaySheetForm />
        {(laySheetBase.layLength != 0) && <LaySheetReport/>}
    </div>
  )
}

export default CuttingLaysReports