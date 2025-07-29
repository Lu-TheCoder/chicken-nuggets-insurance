import Alert from "../../components/alert/Alert"
import './Alerts.css'

function Alerts() {

    return (
        <section className="alerts_section">
            <div className="alerts_header">
                <h3>Alerts</h3>
                <span>Manage all your alerts from here</span>
            </div>
            <div className="alerts_items">
                <div className="alerts_top">
                    <span>Title</span>
                    <span>Timestamp</span>
                    <span>Status</span>
                </div>
                <div className="alerts_container">
                    <Alert />
                    <Alert />
                    <Alert />
                    <Alert />
                </div>
            </div>
        </section>
    )
}

export default Alerts