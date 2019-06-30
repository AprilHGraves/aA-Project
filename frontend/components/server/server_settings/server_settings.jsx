import React from 'react';
import OverviewContainer from './overview';
import { setTimeout } from 'timers';

class ServerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Overview",
      unsavedChanges: false
    };
    this.closeSettings = this.closeSettings.bind(this);
    this.unsavedChangesPresent = this.unsavedChangesPresent.bind(this);
    this.noUnsavedChanges = this.noUnsavedChanges.bind(this);
    this.delServer = this.delServer.bind(this);
  }

  closeSettings(event) {
    event.preventDefault();
    if (this.state.unsavedChanges) {
      this.alertUnsavedChanges();
    } else {
      this.props.closeComponent();
    }
  }

  switchPage(key) {
    return event => {
      if (this.state.unsavedChanges) {
        this.alertUnsavedChanges();
        return
      } else {
        this.setState({ page: key });
      }
      const oldNode = document.querySelector(".selected");
      oldNode.classList.remove("selected")
      event.target.classList.add("selected");
    }
  }

  alertUnsavedChanges() {
    if (this.state.unsavedChanges) {
      const screen = document.querySelector(".settings-fullscreen");
      const alertbox = document.getElementById("unsaved-changes");
      screen.classList.add("shake");
      alertbox.classList.add("redden");
      setTimeout(() => {
        screen.classList.remove("shake");
        alertbox.classList.remove("redden");
      }, 1000);
    }
  }

  unsavedChangesPresent() {
    if (!this.state.unsavedChanges) {
      this.setState({unsavedChanges: true});
    }
  }

  noUnsavedChanges() {
    this.setState({unsavedChanges: false});
  }

  getPage() {
    switch (this.state.page) {
      case "Roles":
        return <div>no roles yet</div>
      case "Members":
        return <div>insert members list here</div>
      case "Invites":
        return <div>insert invites list here  </div>
      default:
        return (
          <OverviewContainer 
            server={this.props.server}
            unsavedChanges={this.state.unsavedChanges}
            unsavedChangesPresent={this.unsavedChangesPresent}
            noUnsavedChanges={this.noUnsavedChanges}

          />
        )
    }
  }

  delServer() {
    this.props.closeComponent();
    this.props.destroyServer(this.props.server.id);
  }

  render() {
    return (
      <section className="settings-fullscreen">
        <div className="settings-left">
          <section className="options-list">
            <ul>
              <h1>{this.props.server.name}</h1>
              <li onClick={this.switchPage("Overview")} className="selected">Overview</li>
              <li onClick={this.switchPage("Roles")}>Roles</li>
            </ul>
            <ul>
              <h1>USER MANAGEMENT</h1>
              <li onClick={this.switchPage("Members")}>Members</li>
              <li onClick={this.switchPage("Invites")}>Invites</li>
            </ul>
            <ul>
              <li onClick={this.delServer} className="destroy">
                Delete Server
              </li>
            </ul>

          </section>

        </div>
        <div className="settings-right">
          {this.getPage()}
          <button id="x-button" onClick={this.closeSettings}>X</button>
        </div>
        
      </section>
    )

  }
}

export default ServerSettings;