import React from 'react';
import { useState, useEffect } from 'react';
import { fetchData } from './api/DataStore';
import { Card, TextField } from '@material-ui/core/';
import StudentCard from './components/StudentCard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

function App() {

  const [studentsData, setStudentsData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchByName, setSearchByName] = useState('');
  const [searchByTag, setSearchByTag] = useState('');

  useEffect(() => {
    fetchData().then((data) => {
      setStudentsData(data.students);
      setFiltered(data.students);
    });
  }, [])

  useEffect(() => {filterResult();}, [searchByName, searchByTag])

  const handleAddTag = (tag, id) => {
    var data = [...studentsData];
    data = data.map((o) => {
      if (o.id === id) {
        return { ...o, tags: o.tags === undefined ? [tag] : [...o.tags, tag] }
      } else {
        return o
      }
    });
    setStudentsData(data);

    var data2 = [...filtered];
    data2 = data2.map((o) => {
      if (o.id === id) {
        return { ...o, tags: o.tags === undefined ? [tag] : [...o.tags, tag] }
      } else {
        return o
      }
    });
    setFiltered(data2);
  }

  const filterByTag = (o) => {
    let flag = false;

    if (o.tags) {
      if (o.tags.some(y => y.toLowerCase().includes(searchByTag.toLowerCase()))) {
        flag = true;
      }
    }
    return flag;
  }

  const filterResult = () => {
    
    let temp = studentsData.filter((o) => {
      let fullName = o.firstName + o.lastName;
      let cond = filterByTag(o);

      if (searchByName !== '' && searchByTag !== '') {
        return fullName.toLowerCase().includes(searchByName.toLowerCase()) && cond;
      }
      if (searchByName !== '') {
        return fullName.toLowerCase().includes(searchByName.toLowerCase());
      }
      if (searchByTag !== '') {
        return cond;
      }
      return o;
    });

    setFiltered(temp);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Card className="on-scrollbar" style={containerStyle}>
          <TextField value={searchByName} onChange={({target}) => {
            setSearchByName(target.value);
          }} style={{ width: '100%' }} id="searchText" label="Search by name" />

          <TextField value={searchByTag} onChange={({target}) => {
            setSearchByTag(target.value);
          }} style={{ width: '100%' }} id="searchTag" label="Search by tag" />

          {
            filtered.map((studentData, index) => {
              return <StudentCard
                key={index}
                index={index}
                handleAddTag={handleAddTag}
                studentData={studentData} />
            })
          }
        </Card>
      </div>
    </MuiThemeProvider>
  );
}

const theme = createMuiTheme({
  typography: {
    h4: {
      fontWeight: 'bolder',
      fontSize: 40
    },
    fontFamily: [
      'Raleway',
      'Open Sans',
      'Work Sans',
      'sans-serif',
    ].join(','),
  }
});


var containerStyle = {
  maxWidth: '700px',
  transitionDuration: '0.3s',
  height: '80%',
  width: '100%',
  margin: '10%',
  overflowY: 'auto',
  padding: '10px',
}



export default App;
