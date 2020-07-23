import React, { useEffect, useState, useRef, Fragment } from 'react';
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
import './ResumeUpload.scss';
const toolbarOptions = useToolbarOptions();

const RichText = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dbPdf, setDbPdf] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const inputEl = useRef(null);

  const { userUuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT + `/api/post-resume/resume/${userUuid}`
      );

      if (data.resumeHtml) {
        const blocksFromHtml = htmlToDraft(data.resumeHtml || '');
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        // turn into new editor state and save here
        setEditorState(editorState);
        setIsShowEditor(true);
      } else {
        setDbPdf(data.resumeUrl);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [userUuid]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSave = async () => {
    if (!uploadedFile && !isShowEditor) {
      return;
    }
    const resumeHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    if (isShowEditor) {
      if (resumeHtml.length <= 8) {
        return;
      }
      const { data } = axios.patch(
        API_ROOT + `/api/post-resume/resume/${userUuid}`,
        {
          resumeHtml,
          resumeUrl: null,
        }
      );
    } else {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const { data } = axios.patch(
          API_ROOT + `/api/post-resume/resume/${userUuid}`,
          {
            resumeUrl: reader.result,
            resumeHtml: '',
          }
        );
      };
      reader.readAsDataURL(uploadedFile);
    }

    // ! break
    // const response = await axios.post(`/api/job/richtext/${uuid}/${userUuid}`, {
    //   descriptionHTML,
    // });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const { files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 1000000) {
        setIsFileTooLarge(true);
      } else if (isFileTooLarge) {
        setIsFileTooLarge(false);
      }

      setUploadedFile(file);
    }
  };

  const triggerFileUpload = (e) => {
    e.preventDefault();
    inputEl.current.click();
  };

  const toggleRichTextEditor = (e) => {
    e.preventDefault();
    if (isShowEditor) {
      setEditorState(EditorState.createEmpty());
      setIsShowEditor(false);
    } else {
      // setUploadedFile(null);
      setIsShowEditor(true);
    }
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
      <ul className="base-info-list bring-up">
        <li>Upload your resume as a PDF.</li>
        <li>
          <strong>Or</strong>, if that does not work, you can use a rich text
          editor button on the right to create your resume.
        </li>
      </ul>
      <div className="resume-container base-container">
        {isFileTooLarge && <div>Your file is too large</div>}
        <div className="button-container">
          {!isShowEditor && (
            <Fragment>
              <label htmlFor="resume" className="invisble-input">
                Resume Upload, accepts pdf or word file
                <input
                  ref={inputEl}
                  onChange={handleFileUpload}
                  name="resume"
                  id="resume"
                  type="file"
                  accept=".pdf"
                />
              </label>
              <button onClick={triggerFileUpload} className="btn btn-blue">
                Upload
              </button>
            </Fragment>
          )}

          {!uploadedFile && dbPdf && !isShowEditor && (
            <a href={dbPdf} target="_blank">
              Current Resume PDF
            </a>
          )}

          {uploadedFile && <p>{uploadedFile.name}</p>}
          <button className="btn btn-blue" onClick={toggleRichTextEditor}>
            {isShowEditor ? 'Close' : 'Text Editor'}
          </button>
        </div>
        {!isShowEditor && <div className="separator" />}

        {isShowEditor && (
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            toolbar={toolbarOptions}
          />
        )}
        <div className="btn-container">
          <button onClick={handleSave} className="btn btn-green">
            Save
          </button>
          <Link
            className="btn btn-orange"
            to={`/post-resume/profile-image/${userUuid}`}
          >
            Back
          </Link>
          <Link
            to={`/post-resume/preview/${userUuid}`}
            className="btn btn-blue"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

function useToolbarOptions() {
  return {
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
}

const mapStateToProps = (state) => ({
  currentUser: state.app.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RichText);
