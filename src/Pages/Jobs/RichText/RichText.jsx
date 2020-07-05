import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { API_ROOT } from 'api-config';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichText.scss';

const toolbarOptions = {
  options: ['inline', 'textAlign', 'list', 'blockType', 'link'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline'],
  },
  blockType: {
    inDropdown: false,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
  },
};

const RichText = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { uuid: userUuid } = props.currentUser;
  const { uuid } = useParams();

  useEffect(() => {
    async function fetchDescription() {
      const { data } = await axios.get(
        API_ROOT + `/api/job/richtext/${uuid}/${userUuid}`
      );

      const blocksFromHtml = htmlToDraft(data.descriptionHTML || '');
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      // turn into new editor state and save here
      setIsLoading(false);
      setEditorState(editorState);
    }
    fetchDescription();
  }, [userUuid, uuid]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSave = async () => {
    const descriptionHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    const response = await axios.post(
      API_ROOT + `/api/job/richtext/${uuid}/${userUuid}`,
      {
        descriptionHTML,
      }
    );
    console.log('RichText -> handleSave -> response', response);
  };

  if (isLoading) {
    // Check if this is right
    return (
      <div className="base-loading-container">
        <ReactLoading type="spin" color="#333" />
      </div>
    );
  }

  return (
    <div>
      <div className="rich-text-container">
        <button className="btn btn-green rich-text-save" onClick={handleSave}>
          Save
        </button>
        <Link
          className="button-position-back"
          to={`/post-job/stepper/details/${uuid}`}
        >
          <button className="btn btn-orange">Back</button>
        </Link>
        <Link
          className="button-position-next"
          to={`/post-job/stepper/image-crop/${uuid}`}
        >
          <button className="btn btn-blue">Next</button>
        </Link>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbarOptions}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.app.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RichText);
