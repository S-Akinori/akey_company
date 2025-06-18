import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...rest }) => {
    return (
        <input
            className="mt-1 block w-full p-4 border border-gray-100 bg-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            {...rest}
        />
    );
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
}

const Label: React.FC<LabelProps> = ({ text, ...rest }) => {
    return (
        <label className="block text-sm font-medium" {...rest}>
            {text}
        </label>
    );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
    return (
        <textarea
            className="mt-1 block w-full p-4 border border-gray-100 bg-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            {...rest}
        />
    );
};

interface FormProps {
    onSubmit: () => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({onSubmit, children }) => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit()
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            {children}
        </form>
    );
};

export { Input, Label, TextArea, Form };