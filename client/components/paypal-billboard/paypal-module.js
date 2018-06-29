import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {Grid, Menu} from 'semantic-ui-react'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicsClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Grid.Row>
            <div>
              <h3>Editor</h3>
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
              <button onClick={this._onItalicsClick.bind(this)}>Italics</button>
              <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
              <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange} />
            </div>
        </Grid.Row>
      </Grid.Column>
    </Grid>

    )
  }
}

export default MyEditor
