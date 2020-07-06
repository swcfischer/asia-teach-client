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
import { pdfjs, Document, Page } from 'react-pdf';

import { API_ROOT } from 'api-config';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ResumeUpload.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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

  // useEffect(() => {
  //   async function fetchDescription() {
  //     const { data } = await axios.get(`/api/job/richtext/${uuid}/${userUuid}`);

  //     const blocksFromHtml = htmlToDraft(data.descriptionHTML || '');
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     // turn into new editor state and save here
  //     setIsLoading(false);
  //     setEditorState(editorState);
  //   }
  //   fetchDescription();
  // }, [userUuid, uuid]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT + `/api/post-resume/resume/${userUuid}`
      );

      setDbPdf(data.resumeUrl);
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
    if (isShowEditor) {
      const descriptionHTML = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      // axios.post // /api/post-resume/resume/userUuid
      // upload string of html
    } else {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const { data } = axios.patch(
          API_ROOT + `/api/post-resume/resume/${userUuid}`,
          {
            resumeUrl: reader.result,
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
      setUploadedFile(null);
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
        <li>Upload your resume as a PDF or Word document.</li>
        <li>
          If that does not work for you, you can use a rich text editor to
          create your resume.
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

class PDF extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    console.log('is this shit on???');
    this.setState({ numPages });
  };

  render() {
    const { pdfUrl } = this.props;
    const { pageNumber, numPages } = this.state;

    console.log('pdf', pdfUrl);
    return (
      <div>
        <Document file={pdfUrl} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

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
