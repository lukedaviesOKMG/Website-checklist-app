import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class TabListSelector extends React.Component {
  state = {
    value: 0,
    listType: 'project'
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  selectList = type => {
    let listType;
    if (type === 'project') {
      listType = 'project';
    } else if ('maintenance') {
      listType = 'main';
    }

    this.setState(
      {
        listType: listType
      },
      () => this.props.updateListType(listType)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          color={this.state.listType === 'project' ? 'primary' : 'default'}
          className={classes.button}
          onClick={() => this.selectList('project')}
        >
          Project
        </Button>

        <Button
          color={this.state.listType === 'main' ? 'primary' : 'default'}
          className={classes.button}
          onClick={() => this.selectList('maintenance')}
        >
          Maintenance
        </Button>
      </div>
    );
  }
}

TabListSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TabListSelector);
