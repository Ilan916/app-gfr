import React from 'react'

function TextArea({ disabled, value, style, updatePrompt }) {

  const adjustTextAreaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`
  };

  const handleTextChange = (e) => {
    const element = e.target;
    updatePrompt(e.value)
    adjustTextAreaHeight(element);
  };

  return (
    <textarea
            className="input"
            placeholder="Expliquer votre problème"
            value={value}
            disabled={disabled}
            style={style}
            onChange={handleTextChange}
          />
  )
}

export default TextArea