import React from 'react';
import { ThemeContext } from './themeContext';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;

    return (
      <button
        {...props}
        style={{
          backgroundColor: `${theme === 'dark' ? 'white' : '#47515b'}`,
          color: `${theme === 'dark' ? '#112d49' : 'white'}`,
          padding: '5px',
          border: 'none',
        }}></button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
