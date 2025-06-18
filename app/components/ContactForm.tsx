import React from 'react';
import { Form, Input, Label, TextArea } from './Form';


const ContactForm: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="mb-4">
                <Label text="お名前" htmlFor="name" />
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <Label text="メールアドレス" htmlFor="email" />
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <Label text="お問い合わせ内容" htmlFor="message" />
                <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                />
            </div>
            <div className='text-center'>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    送信
                </button>
            </div>
        </Form>
    );
};

export default ContactForm;
