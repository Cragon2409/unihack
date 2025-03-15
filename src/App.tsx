import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { supabase } from './API/supabase';

import AppLayout from './components/Layout/AppLayout'
import LoginLayout from './components/Layout/LoginLayout'
import ThemeProvider from './components/ThemeProvider/ThemeProvider'
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Timetable from './pages/Timetable/Timetable';
import Login from './pages/Login/Login';

import { useAppDispatch, useAppSelector } from './API/hooks'
import { fetchCourses } from './API/coursesSlice'
import { setSession } from './API/sessionSlice';

import './App.css'

function App() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  // const [_errorLogMessage, setErrorLogMessage] = useState("")
  const [courseTable, _setCourseTable] = useState(null)
  console.log(courses)

  useEffect(() => { // log in effects
    // setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session as React.SetStateAction<null>))
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session as React.SetStateAction<null>))
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session != null) {
      dispatch(fetchCourses((session as any)?.user.id));
    }
  }, [session]);

  // useEffect(() => { //retrieve relevant databases for user
  //   if (session != null) {
  //     const fetchCourseTable = async () => {
  //       const {data, error} = await supabase 
  //         .from('courses')
  //         .select()
  //         .in("user_id", [(session as any).user.id])

  //       if (error) {
  //         setErrorLogMessage("Database failed to retrieve")
  //       }
  //       if (data) {
  //         setCourseTable(data as any)
  //       }

  //     }
  //     fetchCourseTable()
  //   }
  // }, [session])

  useEffect(() => { //log course table
    // console.log("Course Table:")
    // console.log(courseTable)
  },[courseTable])

  return (
    <ThemeProvider>
      <Routes>
        {
          session ? 
          (
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="timetable" element={<Timetable />} />
            </Route>
          )
          :
          (
            <Route path="/*" element={<LoginLayout />}>
              <Route path="*" element={<Login supabase={supabase} />} />
            </Route>
          )
        }
      </Routes>
    </ThemeProvider>
  );  
}

export default App;