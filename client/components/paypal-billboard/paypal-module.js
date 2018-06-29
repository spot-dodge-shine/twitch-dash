import React from 'react';
import {Editor, EditorState} from 'draft-js';
import {Grid, Menu} from 'semantic-ui-react'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Grid.Row>

              <Editor editorState={this.state.editorState} onChange={this.onChange} />

        </Grid.Row>
      </Grid.Column>
    </Grid>

    )
  }
}

export default MyEditor
