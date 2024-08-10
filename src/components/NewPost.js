import React, { useState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import "../styles/NewPost.css";

const initialState = {
    content: ''
}

const NewPost = ({isOpen, onSubmit, onClose}) => {
    const focusInputRef = useRef();
    const [formState, setFormState] = useState(initialState);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
        setFormState(initialState);
    }

    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            setTimeout(() => {
                focusInputRef.current.focus();
            }, 0);
        }
    }, [isOpen]);

    return <Modal isOpen={isOpen} onClose={onClose} className="new-post-modal">
        <form onSubmit={handleSubmit} className="new-post-form">
            <div className="new-post-editor">
                <label htmlFor="content" className="new-post-editor-label">Novo post</label>
                <textarea
                    name="content"
                    id="content"
                    ref={focusInputRef}
                    value={formState.content}
                    onChange={handleInputChange}
                    className="new-post-editor-input"
                />
            </div>
            <div className="new-post-submit">
                <button
                    type="submit"
                    className="new-post-submit-button"
                >
                    Postar
                </button>
            </div>
        </form>
    </Modal>
}

export default NewPost;