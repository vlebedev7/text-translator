import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Reader from "./components/Reader.jsx";
import LangDownload from "./components/LangDownload.jsx";
import LangsPanel from "./components/LangsPanel.jsx";

class App extends Component {
  render() {
    const testText = "Offiziell sollen die regierungskritischen Proteste im Iran beendet sein - doch sie gehen weiter.";
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LangsPanel />
        <Reader text={testText} />
        <LangDownload />
      </div>
    );
  }
}

export default App;
