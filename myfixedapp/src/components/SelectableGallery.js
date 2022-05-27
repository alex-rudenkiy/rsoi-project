import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './SelectableGallery.css';
import * as _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: "white",//theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export function SelectableHorizontalGallery(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        props.onChange(selected);
        console.log(selected);
        },[selected])
    
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3.0} style={{padding:"1em"}}>
                {props.tileData.map((tile) => (
                    <GridListTile key={tile.img} onClick={()=>{
                        if(_.find(selected, tile)){
                            let t = [...selected];
                            _.remove(t, (e)=>e.id==tile.id);
                            setSelected(t);
                            console.log(selected);

                        }else{
                            setSelected(_.concat(selected, [tile]));
                        }
                    }}>
                        <canvas id="canvas" style={{    position: "absolute",
                            background: "transparent",
                            zIndex: "1",
                            width: "100%",
                            height: "100%"}}>
                            Your browser does not support the canvas element.
                        </canvas>
                        <img className={_.find(selected, tile)?"":"swtchImg"} src={tile.img} alt={tile.title}/>
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            /*actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }*/
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
