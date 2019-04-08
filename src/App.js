import React, { Component } from 'react';
import TopBar from './components/TopBar';
import AddBar from './components/AddBar';
import ProjectCard from './components/ProjectCard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: []
    };
  }

  getProjectList = project => {
    this.setState(state => ({
      projectList: state.projectList.concat([project])
    }));
  };

  updateProjects = (list, updated) => {
    const index = list.findIndex(item => item.id === updated[0].id);
    return [...list.slice(0, index), ...updated, ...list.slice(index + 1)];
  };

  render() {
    return (
      <div className="App">
        <TopBar />
        <AddBar getProjectList={this.getProjectList} />
        {this.state.projectList.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              title={project.title}
              date={project.date}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
