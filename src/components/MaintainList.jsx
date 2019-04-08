import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ToDoList from './ToDoList';

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

class MaintainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      mobileListComplete: false,
      desktopListComplete: false,
      miscListComplete: false,
      cardComplete: false,
      open: false,
      listType: 'maintain',
      value: 0
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  completed = listName => {
    this.setState(
      {
        [listName]: true
      },
      () => {
        this.checkCardComplete();
      }
    );
  };

  checkCardComplete = () => {
    const {
      mobileListComplete,
      desktopListComplete,
      miscListComplete
    } = this.state;

    if (mobileListComplete && desktopListComplete && miscListComplete) {
      this.setState(
        {
          listStatus: true,
          expanded: false
        },
        () =>
          this.props.checkListComplete(
            this.state.listType,
            this.state.listStatus
          )
      );
    }
  };

  render() {
    const { listItems, classes } = this.props;
    return (
      <CardContent>
        <Typography component="h4" className={classes.h4}>
          Overall | To Do
        </Typography>

        {this.state.miscListComplete ? (
          <Typography component="p" className={classes.para}>
            Complete!
          </Typography>
        ) : (
          <ToDoList
            completed={this.completed}
            listTitle={'miscListComplete'}
            listItems={listItems.misc}
          />
        )}

        <Typography component="h4" className={classes.h4}>
          Mobile | To Do
        </Typography>

        {this.state.mobileListComplete ? (
          <Typography component="p" className={classes.para}>
            Complete!
          </Typography>
        ) : (
          <ToDoList
            completed={this.completed}
            listTitle={'mobileListComplete'}
            listItems={listItems.mobile}
          />
        )}

        <Typography component="h4" className={classes.h4}>
          Desktop | To Do
        </Typography>

        {this.state.desktopListComplete ? (
          <Typography component="p" className={classes.para}>
            Complete!
          </Typography>
        ) : (
          <ToDoList
            completed={this.completed}
            listTitle={'desktopListComplete'}
            listItems={listItems.desktop}
          />
        )}
      </CardContent>
    );
  }
}

MaintainList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaintainList);
