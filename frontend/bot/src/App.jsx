import Form from './form'
import Formone from './form_1'
import FormTwo from './form_2'
import FormThree from './form_3'
import FormFour from './form_4'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/Managment' element={<Formone/>}/>
      <Route path='/Hotel' element={<FormTwo/>}/>
      <Route path='/Computer' element={<FormThree/>}/>
      <Route path='/Medical' element={<FormFour/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
