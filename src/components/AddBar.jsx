import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '50px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100vw',
    marginTop: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 400
  }
});

class AddBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectDate: '',
      projectList: []
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      projectDate: '07/04/2019'
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const projectObj = {
      title: this.state.projectName,
      date: this.state.projectDate,
      completed: false
    };
    this.props.getProjectList(projectObj);
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        className={classes.container}
        onSubmit={this.onSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="New Project Name"
          className={classes.textField}
          value={this.state.projectName}
          onChange={this.handleChange('projectName')}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

AddBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddBar);
