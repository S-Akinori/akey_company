
import ContactForm from "./ContactForm"
import Headings from "./Headings";

const ContactFormSection = () => {
    return (
        <div>
            <Headings level={2} className="text-center">お問い合わせ</Headings>
            <div className="mt-4">
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactFormSection;