import { useLocation } from "react-router";
import Footer from '../components/Footer.tsx';

export function ReviewPage() {
    const location = useLocation(); //these will need specified types as well.

    return (
        <>
            <h3>REVIEW</h3>
            <div id="metafield">
                <p>{'total attempts: ' + location.state.totalAttempts}</p>
                <p>{'total review time: ' + location.state.reviewTime}</p>
                <p>{'cards completed on first attempt: ' + location.state }</p>
            </div>
            <Footer />
        </>
    );
}