import React from 'react';
import { css } from 'emotion';
import cssValues from './data/cssValues';
import Reader from './components/Reader';
import LangDownload from './components/LangDownload';
import LangsPanel from './components/LangsPanel';

const headerStyle = css`
  background-color: ${cssValues.colors.black};
  height: 60px;
  padding: 10px;
  color: ${cssValues.colors.cyan};
`;

const App = () => {
  const testText =
    'Offiziell sollen die regierungskritischen Proteste im Iran beendet sein - doch sie gehen weiter.';
  return (
    <div className="App">
      <header className={headerStyle}>
        <h1 className="App-title">Learn a language by reading!</h1>
      </header>
      <LangsPanel />
      <Reader text={testText} />
      <LangDownload />
    </div>
  );
};

export default App;
