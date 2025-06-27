import React, { useState } from 'react'
import Nav from './comp/nav'
import { BrowserRouter } from 'react-router-dom'
import Rout from './comp/rout.js'
import Footer from './comp/footer.js'

const App = () => {

  const [detailData, setDetailData] = useState([])
  const [detailClose, setDetailClose] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const detail = (x) => {

    const data = ([{x}])
    const getdata = data[0]['x']
    setDetailData(getdata)
    setShowDetail(true)
    setDetailClose(true)
  }
  const close =() => {
    setDetailClose(false)
  }
  return (
    <>
    <BrowserRouter>
     <Nav />
     <Rout detail={detail} detailData={detailData} close={close} detailClose={detailClose} showDetail={showDetail}/>
     <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App