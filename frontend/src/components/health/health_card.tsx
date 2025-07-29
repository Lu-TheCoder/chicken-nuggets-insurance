import { Link } from 'react-router-dom'
import './health_card.css'
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5'

function HealthCard () {
    return (
        <div className='health_card'>
            <span>Name</span>
            <span>Status</span>
            <span>Date</span>
            <div className='buttons'>
                <Link to={'/dashboard/health/2/edit'} className='edit' ><IoPencilOutline /></Link>
                <Link to={'/dashboard/health/2/delete'} className='delete' ><IoTrashOutline  /></Link>
            </div>
        </div>
    )
}

export default HealthCard