import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ListCard from './ListCard';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import TabListSelector from './TabListSelector';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: '25px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
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
  }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      cardComplete: false,
      open: false,
      value: 0,
      listType: 'project'
    };
  }

  capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  updateListType = type => {
    this.setState({
      listType: type
    });
  };

  checkCardStatus;

  render() {
    const { classes, title, date } = this.props;
    const { cardComplete } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            cardComplete
              ? this.capitalize(title) + ' Completed'
              : this.capitalize(title)
          }
          subheader={date}
          className={cardComplete ? classes.cardComplete : ''}
        />
        <CardContent>
          <TabListSelector updateListType={this.updateListType} />
        </CardContent>

        <ListCard listType={this.state.listType} />
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
