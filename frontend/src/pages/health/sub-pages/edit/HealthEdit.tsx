import { IoLogoSass } from "react-icons/io5";
import { Link } from "react-router-dom";
import './HealthEdit.css'

function HealthEdit() {
    return (
        <>
            <Link to={'/dashboard/health'} className="backdrop"></Link>

            <dialog open>
                    <h2>Update your health</h2>
                    <IoLogoSass className="logo" />

                <form onSubmit={(e) => e.preventDefault()}>
                    <p>
                        <label htmlFor="name">Health title</label>
                        <input type="text" id="name" name="name" />
                    </p>

                    <p>
                        <label htmlFor="description">Result</label>
                        <textarea id="description" name="description"></textarea>
                    </p>

                    <p>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" />
                    </p>

                    <div className="actions">
                        <div className="buttons">
                        <Link to={'/dashboard/health'} className="btn cancel" type="button">Cancel</Link>
                        <button className="btn" type="submit">Update</button>
                        </div>
                    </div>
                </form>

            </dialog>
        </>
    )
}

export default HealthEdit;