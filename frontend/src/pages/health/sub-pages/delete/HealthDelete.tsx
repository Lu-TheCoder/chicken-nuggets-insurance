import { IoTrashOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import './HealthDelete.css'

function HealthDelete () {
    return (
        <>
            <Link to={'/dashboard/health'} className="backdrop" onClick={() => console.log("Navigate away")} />
            <dialog open>
                <div className="bin">
                    <IoTrashOutline />
                </div>
                <h3>Are you sure you want this health track?</h3>
                <span>Boitumelo Mkhwanazi</span>
                <div className="buttons">
                <Link to={'dashboard/health'} className="btn cancel">Cancel</Link>
                <button className="btn delete" onClick={() => console.log("Delete developer")}>
                    Delete
                </button>
                </div>
            </dialog>
        </>
    )
}

export default HealthDelete