import { useState,useEffect } from "react";
import {Box, Paper, Typography} from '@mui/material'
import RoomIcon from '@mui/icons-material/Room';
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function Details (){
    const [data, setData] = useState();

    return(
        <>
            {detail?.map ((data)=>(
                <Paper sx={{margin: 2, padding: 1}}>
                <h2>{data.title}</h2>
                <Typography>{data.organization}|<RoomIcon sx={{ fontSize: 20, marginTop: "12px", marginLeft: "5px" }}/>{data.location}</Typography>
                <Typography>{data.jobtype}|<DateRangeIcon sx={{fontSize: 20, marginLeft: "5px"}}/>Date Posted: {data.dateAdded}</Typography>
                <h4>Minimum Qualifications</h4>
                <Typography>{data.minimumQualifications}</Typography>
                <h4>Preferred Qualifications</h4>
                <Typography>{data.preferredQualifications}</Typography>
                <h4>Description</h4>
                <Typography>{data.description}</Typography>
                </Paper>
            ))}
        </>
    )
}

const detail = [
    {
        id: "1",
        title: "Java Coder",
        organization: "VueTube",
        degree: "Bachelor's",
        jobtype: "Part-time",
        location: ["Buenos Aires", "Oslo"],
        minimumQualifications: [
            "Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives",
            "Morph bricks-and-clicks relationships, whiteboard one-to-one experiences, and innovate distributed schemas",
            "Drive intuitive deliverables, exploit vertical users, and optimize interactive e-commerce",
            "Embrace sticky infrastructures, incubate B2C portals, and drive killer applications"
        ],
        preferredQualifications: [
            "Mesh wireless metrics, syndicate innovative markets, and disintermediate intuitive niches",
            "Matrix next-generation vortals, cultivate virtual relationships, and unleash wireless platforms",
            "Brand granular roi, transform mission-critical users, and target value-added models",
            "Envisioneer b2b web services, aggregate clicks-and-mortar architectures, and target synergistic initiatives"
        ],
        description: [
            "Away someone forget effect wait land.",
            "State even create can either. Character almost turn idea born its to. Understand ability another lose. Smile interesting claim difference.",
            "Author act increase worry yeah. Positive medical shake include serious check state."
        ],
        dateAdded: "2021-07-04"
    },
]