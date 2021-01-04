import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Tag } from '../../models/host';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

type TagChipsProps = {
    tagList: Tag[];
}

export const TagChips = (props: TagChipsProps): any => {
    const classes = useStyles();
    let history = useHistory();

    return (<Paper elevation={0} component="ul" className={classes.root}>
        {props.tagList.map((tag) => {
            return (
                <li key={tag.id}>
                    <Chip
                        label={tag.name}
                        className={classes.chip}
                        onClick={() => {
                            history.push(`/objects/tableTag/${tag.id}`)
                        }}
                    />
                </li>
            );
        })}
    </Paper>);
}