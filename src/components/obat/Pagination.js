import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 1200,
        marginTop: 30,
        margin: 'auto'
    },
    list: {
        marginRight: 10
    }
}));

function Paginations({obatPerPage,totalObat,page}) {
    const pageNumber = [];
    for(let i = 1; i<= Math.ceil(totalObat / obatPerPage); i++) {
        pageNumber.push(i)
    }
    const classes = useStyles();
    return (
        <div className={classes.container}>
            
            {
                pageNumber.map(number => (
                    <Fab className={classes.list} key={number} onClick={() => {
                        page(number)
                    }} size="small" aria-label="add" >
                        {number}
                    </Fab>
                ))
            }         
        </div>
    )
}

export default Paginations
