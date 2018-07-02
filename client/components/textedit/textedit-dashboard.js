import React, {Component} from 'react'
import {EditorState, RichUtils} from 'draft-js'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import {Grid, Menu} from 'semantic-ui-react'
// import editorStyles from './editorStyle.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'

const staticToolbarPlugin = createToolbarPlugin()
const { Toolbar } = staticToolbarPlugin
const plugins = [staticToolbarPlugin]
const text = 'text'

class TextEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar />
        </div>
      </div>
    );
  }
}

export default TextEditor
