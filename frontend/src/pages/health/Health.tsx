import { Link, Outlet } from 'react-router-dom'
import './Health.css'
import HealthCard from '../../components/health/health_card'

function Health () {
    return (
        <>
        <Outlet />
            <section className="health">
                <div className="health_header">
                    <div className="left">
                        <h3>Your health</h3>
                        <span>Manage your health from here</span>
                    </div>
                    <Link to={'/dashboard/health/create'} className='btn'>+Health</Link>
                </div>
                <div className='health_main'>
                    <div className="health_top">
                        <span>Title</span>
                        <span>Timestamp</span>
                        <span>Status</span>
                        <span>Update</span>
                    </div>
                    <div className='health_cards'>
                        <HealthCard />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Health