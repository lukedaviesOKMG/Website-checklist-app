import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
      listComplete: false
    };
  }

  checkifListisComplete = () => {
    let total = this.props.listItems.length;
    let checked = this.state.checked.length;

    if (checked === total) {
      this.setState({ listComplete: true });
      this.props.completed(this.props.listTitle, true);
    } else {
      this.setState({ listComplete: false });
    }
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.checkifListisComplete();
      }
    );
  };

  render() {
    const { classes, listItems } = this.props;
    return (
      <List dense className={classes.root}>
        {listItems.map((item, index) => (
          <ListItem key={item.value} button>
            <ListItemText primary={`${item.text}`} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(item.value)}
                checked={this.state.checked.indexOf(item.value) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

ToDoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToDoList);
