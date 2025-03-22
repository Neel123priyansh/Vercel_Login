import Form from './form'
import Formone from './form_1'
import FormTwo from './form_2'
import FormThree from './form_3'
import FormFour from './form_4'
import {Route, Routes,HashRouter, BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <div>
     <HashRouter>
     <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/Managment' element={<Formone/>}/>
      <Route path='/Hotel' element={<FormTwo/>}/>
      <Route path='/Computer' element={<FormThree/>}/>
      <Route path='/Medical' element={<FormFour/>}/>
     </Routes>
     </HashRouter>
    </div>
  )
}

export default App
