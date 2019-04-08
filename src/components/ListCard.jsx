import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ShareDialog from './ShareDialog';
import ProjectList from './ProjectList';
import MaintainList from './MaintainList';

const listItems = {
  project: {
    mobile: [
      { value: 0, text: 'Tested chrome mobile' },
      { value: 1, text: 'Tested safari mobile' },
      { value: 2, text: 'Tested iPhone sizes' },
      { value: 3, text: 'Tested iPad sizes' },
      { value: 4, text: 'Tested Samsung sizes' },
      { value: 5, text: 'Tested smaller device sizes' },
      { value: 6, text: 'Minify CSS and JS' }
    ],
    desktop: [
      { value: 0, text: 'Check Https certificates' },
      { value: 1, text: 'Tested on Chrome' },
      { value: 2, text: 'Tested on Firefox' },
      { value: 3, text: 'Tested on Safari' },
      { value: 4, text: 'Tested on Edge' },
      { value: 5, text: 'Tested on IE' }
    ],
    misc: [
      { value: 0, text: 'Check Https certificates' },
      { value: 1, text: 'Meta tags in header' },
      { value: 2, text: '404 pages' },
      { value: 3, text: 'Added CSS prefixes' },
      { value: 4, text: 'Optimise Images' }
    ]
  },
  maintain: {
    mobile: [
      { value: 0, text: 'Tested chrome mobile' },
      { value: 1, text: 'Tested safari mobile' }
    ],
    desktop: [
      { value: 0, text: 'Check Https certificates' },
      { value: 1, text: 'Tested on Chrome' }
    ],
    misc: [
      { value: 0, text: 'Check Https certificates' },
      { value: 1, text: 'Check Https certificates' }
    ]
  }
};

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  h4: {
    marginTop: '25px',
    borderBottom: '1px solid',
    lineHeight: '45px'
  },
  para: {
    color: '#74ca74',
    marginTop: '10px',
    fontSize: '25px'
  },
  cardComplete: {
    backgroundColor: '#74ca74',
    color: '#fff'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      projectListStatus: false,
      maintainListStatus: false,
      listType: 'project'
    };
  }

  componentWillReceiveProps() {
    this.setState({
      listType: this.props.listType
    });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkListComplete = (list, listStatus) => {
    if (listStatus) {
      if (list === 'project') {
        this.setState({
          projectListStatus: true
        });
      } else if (list === 'maintain') {
        this.setState({
          maintainListStatus: true
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share" onClick={this.handleClickOpen}>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {this.props.listType === 'project' ? (
            <ProjectList
              listItems={listItems.project}
              checkListComplete={this.checkListComplete}
            />
          ) : this.props.listType === 'main' ? (
            <MaintainList
              listItems={listItems.maintain}
              checkListComplete={this.checkListComplete}
            />
          ) : (
            <p>something went wrong</p>
          )}
        </Collapse>

        {this.state.open ? (
          <ShareDialog
            open={this.state.open}
            handleClose={this.handleClose}
            title={this.props.title}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

ListCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListCard);
