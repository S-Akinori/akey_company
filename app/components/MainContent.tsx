import ContactFormSection from "./ContactFormSection";
import Container from "./Container";
import FV from "./FV";
import MissionSection from "./Mission";
import ServiceSection from "./ServiceSection";

export default function MainContent() {
    return (
        <>
            <FV />
            {/* <MessageSection /> */}
            <Container>
                <ServiceSection />
            </Container>
            <div className="bg-white text-black">
                <Container>
                    <MissionSection />
                </Container>
            </div>
            <Container>
                <ContactFormSection />
            </Container>
        </>
    );
  }
  