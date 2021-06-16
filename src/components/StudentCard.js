import React, { useState } from 'react'
import {
    Card,
    Avatar,
    Grid,
    Typography,
    Collapse,
    TextField,
    Chip,
} from '@material-ui/core/';
import { Add } from '@material-ui/icons';

const getAverage = (arr) => {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i], 10);
    }
    return sum / arr.length;
}

function StudentCard({ studentData, handleAddTag, index }) {

    const [expanded, setExpanded] = useState(false);
    const [tagText, setTagText] = useState('');
    const fullName = studentData.firstName + " " + studentData.lastName;
    const { email, company, skill, pic } = studentData;
    const grades = studentData.grades;
    const average = getAverage(grades);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card key={index} className="studentCard" style={{ margin: "5px", padding: "10px", boxShadow: 'none', borderBottom: "1px solid #cfd8dc" }}>
            <Grid container spacing={4}>
                <Grid item>
                    <Avatar src={pic} style={avatarStyle} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={1}>
                        <Typography style={{ textTransform: 'uppercase', marginLeft: "-10px" }} variant="h4" gutterBottom>
                            {fullName}
                        </Typography>
                        <Grid item xs>
                            <Typography variant="body2" gutterBottom>
                                Email: {email}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Company: {company}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Skill: {skill}
                            </Typography>
                            <Typography variant="body2">
                                Average: {(average).toFixed(2)}%
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Collapse in={expanded}>
                                <table>
                                    <tbody>
                                        {grades.map((grade, index) => {
                                            return (<tr key={index}><td>Test {index + 1}:</td><td style={{ paddingLeft: "15px" }}>{grade}%</td></tr>)
                                        })}
                                    </tbody>
                                </table>
                            </Collapse>
                        </Grid>
                        <Grid item container direction="column" spacing={1}>
                            <Grid item>
                                {
                                    studentData.tags ?
                                        studentData.tags.map((tag, i) => {
                                            return <Chip style={{ marginRight: "2px" }} key={i} label={tag} />
                                        }) : ''
                                }
                            </Grid>
                            <Grid item>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddTag(tagText, studentData.id);
                                    setTagText('');
                                }}>
                                    <TextField value={tagText} onChange={(e) => setTagText(e.target.value)} label="Add a tag" />
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <button className="plusIconButton" onClick={handleExpandClick}>
                            <Add fontSize="large" />
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

var avatarStyle = {
    height: "90px",
    width: "90px",
    border: "1px solid grey"
}

export default StudentCard
