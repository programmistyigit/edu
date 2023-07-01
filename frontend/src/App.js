import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Admin from './components/businesMen/Admin';
import { useEffect, useState } from 'react';
import { add } from './stores/classes';
import { addStudent } from './stores/allSudents';
import { addTeacher } from './stores/allTichers';
import { addMother } from './stores/motherStore';
import NotistakComponent from './components/notistack';

function App() {

  const thema = useSelector(e=>e.thema)
  const distpatch = useDispatch()
  const [data , setData] = useState(undefined)
  useEffect(()=>{
    fetch("http://localhost:5000/businesmen")
    .then(respons=>respons.json())
    .then(({BusinesMenData , Students , Techars , mother})=>{
      const classes = BusinesMenData.classes.map(classesItem=> ({...classesItem , students:Students.filter(studentData=> classesItem.studentsId.includes(studentData.id))}) )
      distpatch(add(classes))
      distpatch(addStudent(Students))
      distpatch(addTeacher(Techars))
      distpatch(addMother(mother))
      setData(true)
      console.log(mother);
    })
  } , [distpatch])

  return(
    <NotistakComponent />
  )

  if(!data) return <h1>loading..</h1> ;


  return (
    <div style={{position:"absolute" , zIndex:1000000000000000000}} className={`bg-${thema.bg} w-100`}>
      <Admin />
    </div>
  );
}

export default App;
