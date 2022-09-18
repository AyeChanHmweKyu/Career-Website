import {Grid, Paper, InputBase, Typography, Button, Box, MenuItem, TextField} from '@mui/material'
import {AppBar, Toolbar, IconButton} from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react';
import Details from './details'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import Chip from "@mui/material/Chip";
import Collapse from '@mui/material/Collapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import RoomIcon from '@mui/icons-material/Room';
import DateRangeIcon from '@mui/icons-material/DateRange';

const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    grid: {
        height: "100%"
    },
    formControl: {
      variant: "outlined"
    }
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    height: '40px',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function mainpage(){
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
          }
        }
      };
    const classes = useStyles();
    const [checked, setChecked] =useState(false);
    const [filterLocation,setFilterLocation]=useState([]);
    const [jobs,setJobs] = useState([]);
    const [jobType,setJobType]=useState([]);
    const [jobTypeFilter,setJobTypeFilter]=useState([]);
    const [locations,setLocations]=useState([]);
    const [title,setTitle]=useState("");
    const [titleFilter,setTitleFilter]=useState();
    const [check,setCheck]=useState([false,false,false,false]);
    useEffect(() => {
        try{
           axios.get(`http://localhost:8000/jobs` 
          )
          .then((res) => {
            setJobs (res.data);
            var locTemp=[];
            var jobTemp=[];
            var titleTemp=[];
            console.log(jobs);
            res.data.map((loc,index)=>{
                    locTemp = locTemp.concat(loc.locations);
                if(!jobTemp.includes(loc.jobType)){
                    console.log('find one');
                    jobTemp.push(loc.jobType);
                }
            });
            var uniqueArray = [];
            for( var i=0; i < locTemp.length; i++){
                if(uniqueArray.indexOf(locTemp[i]) === -1) {
                    uniqueArray.push(locTemp[i]);
                }
            }
            uniqueArray.sort();
            console.log(jobTemp);
            setLocations(uniqueArray);
            res.data.map((title,index)=>{
              if(!titleTemp.includes(title.title)){
                console.log('find one');
                titleTemp.push(title.title);
            }
            });
            setTitle(titleTemp);
            setJobType(jobTemp);
  
          },err=> {
            router.push({
            pathname: '/login',
          });
        })
        }catch(e){
          console.log(e.message);
      }
      }, []);


    const handleChange = (event) => {
        setFilterLocation(event.target.value);
        var value = event.target.value;
        var filterString="/?";
        for(var i=0; i<value.length;i++){
          filterString = filterString.concat(`locations_like=${value[i]}&&`);
        }
        if(jobTypeFilter.length>0){
          for(var i=0; i<jobTypeFilter.length;i++){
            filterString = filterString.concat(`jobType_like=${jobTypeFilter[i]}&&`);
          }
        }
        if(titleFilter){
          filterString = filterString.concat(`title_like=${value}&&`);
          }
        axios.get(`http://localhost:8000/jobs${encodeURI(filterString)}`).then((res) => {
          setJobs (res.data);

        });
        console.log(`http://localhost:8000/jobs${filterString}`);
      };

      const Collapsing = () => {
        setChecked((prev) => !prev);
      };

      const titleChange =(event,value)=>{
        setTitleFilter(value);
        console.log(value);
        var filterString="/?";
        for(var i=0; i<jobTypeFilter.length;i++){
          filterString = filterString.concat(`jobType=${jobTypeFilter[i]}&&`);
        }
        if(filterLocation.length>0){
          for(var i=0; i<filterLocation.length;i++){
            filterString = filterString.concat(`locations_like=${filterLocation[i]}&&`);
          }
        }
        if(value){
        filterString = filterString.concat(`title_like=${value}&&`);
        }
        
        axios.get(`http://localhost:8000/jobs${encodeURI(filterString)}`).then((res) => {
          setJobs (res.data);

        });
        console.log(`http://localhost:8000/jobs${encodeURI(filterString)}`);
      }

      const handleChangeMultiple = (
        event
      ) => {
        const { options } = event.target;
        const value= [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setFilterLocation(value);
      };
      const clearFilter = async()=>{
        setFilterLocation([]);
        setJobTypeFilter([]);
        setTitleFilter(undefined);
        var tempCheck = check;
        for(var i =0;i<check.length;i++){
          tempCheck[i] = false;
        }
        setCheck(tempCheck);
        try{
          axios.get(`http://localhost:8000/jobs` 
         )
         .then((res) => {
           setJobs (res.data);
         },err=> {
           router.push({
           pathname: '/login',
         });
        
      })}catch(e){
        console.log(e.message);
    }
  }
     const checkBoxFilter=async (event)=>{

        var value = event.target.value;
        var tempCheck = check;
        tempCheck[jobType.indexOf(value)] = event.target.checked;
        setCheck(tempCheck);
        var tempJobType = jobTypeFilter;
        if(tempJobType.indexOf(value)==-1){
          tempJobType.push(value);
        }
        else{
          tempJobType.splice(tempJobType.indexOf(value),1);
        }

        var filterString="/?";
        for(var i=0; i<tempJobType.length;i++){
          filterString = filterString.concat(`jobType=${tempJobType[i]}&&`);
        }
        if(filterLocation.length>0){
          for(var i=0; i<filterLocation.length;i++){
            filterString = filterString.concat(`locations_like=${filterLocation[i]}&&`);
          }
        }
        if(titleFilter){
          filterString = filterString.concat(`title_like=${titleFilter}&&`);
          }
        axios.get(`http://localhost:8000/jobs${encodeURI(filterString)}`).then((res) => {
          setJobs (res.data);

        });
        console.log(`http://localhost:8000/jobs${filterString}`);

        setJobTypeFilter(tempJobType);
        console.log(jobTypeFilter);
        
     }
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                        Jobs
                    </Typography>
                    <Button color="inherit">Sign In</Button>
                </Toolbar>
            </AppBar>
            <Grid sx={{display: "flex", height: "100%"}} container align={'flex-start'}>
                <Grid item xs="4">
                    <Item>
                        <div style={{display: "flex", justifyContent: "space-between"}}> 
                        <Typography>What do you want to do?</Typography>
                        <Button size="small" onClick={clearFilter}>ClearFilters</Button>
                        </div>
                    </Item>
                    <Item>
                      <div >
                        <Search style={{display: "flex", justifyContent: "space-between"}}>
                            {/* <SearchIcon style={{marginright: 1}}/> */}
                            <Autocomplete
                             freeSolo
                              id="combo-box-demo"
                              value={titleFilter}
                              options={title}
                              sx={{ width: "100%" }}
                              onChange={titleChange}
                              renderInput={(params) => <TextField {...params} placeholder={`${title[0]},${title[1]},${title[2]}`} />}
                              />
                          </Search>
                        </div>
                    </Item>
                    <Item>
                    {/* <div className={classes.chips}>
                        {filterLocation?.map(value => (
                        <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                        onDelete={() => {
                            setFilterLocation((loc) => loc.filter((loca) => loca !== value));
                        }}
                        />
                        ))}
                    </div> */}
                    <FormControl fullWidth variant='outlined'>
                    <InputLabel >Locations</InputLabel>
                    <Select
                      // sx={{border: 1, borderRadius: 1, height: "55px"}}
                      multiple
                      value={filterLocation}
                      onChange={handleChange}
                      input={<BootstrapInput />}
                      MenuProps={MenuProps}
                    >
                      {locations.map(loc => (
                        <MenuItem
                          key={loc}
                          value={loc}
                        >
                          {loc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    </Item>
                    <Item >
                        <Box onClick={Collapsing} sx={{margin: 2}}>
                        <Typography>Job Type</Typography>
                        </Box>
                        
                        <Collapse in={checked}>
                        <FormGroup sx={{marginLeft: 1}}>
                        <Grid  container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {
                                jobType.map((jbs,index)=>(
                                    <Grid item xs={6} >
                            <FormControlLabel onChange={checkBoxFilter} control={<Checkbox />} checked={check[index]}  value={jbs} label={jbs} />
                            </Grid>
                                ))
                            }
                            
                        </Grid>
                        </FormGroup>
                        </Collapse>
                    </Item>
                </Grid>
                <Grid item xs="8">
                    <div>
                    {jobs?.map ((data)=>(
                      <Paper sx={{margin: 2, padding:1}}>
                      <h2>{data.title}</h2>
                      <Typography>{data.organization}|<RoomIcon sx={{ fontSize: 20, marginTop: "12px", marginLeft: "5px" }}/>{data.locations}</Typography>
                      <Typography>{data.jobType}|<DateRangeIcon sx={{fontSize: 20, marginLeft: "5px"}}/>Date Posted: {data.dateAdded}</Typography>
                      <h4>Minimum Qualifications</h4>
                      <Typography>{data.minimumQualifications}</Typography>
                      <h4>Preferred Qualifications</h4>
                      <Typography>{data.preferredQualifications}</Typography>
                      <h4>Description</h4>
                      <Typography>{data.description}</Typography>
                      </Paper>
                  ))}
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}