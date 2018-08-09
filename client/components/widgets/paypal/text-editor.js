import React, {Component} from 'react'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
// import editorStyles from '../../../public/style.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import styled from 'styled-components'

const staticToolbarPlugin = createToolbarPlugin()
const { Toolbar } = staticToolbarPlugin
const plugins = [staticToolbarPlugin]
const text = 'Your Billboard Message'


const EditorStyle = styled.div`
  width: 425px;
  height: auto;
`

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
      <EditorStyle>
        <div className='editor' onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar />
        </div>
      </EditorStyle>
    );
  }
}

export default TextEditor
