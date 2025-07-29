import { Link } from 'react-router-dom';
import './HealthCreate.css'
import { IoLogoSass } from 'react-icons/io5';

function HealthCreate () {
 
    return (
        <>
            <Link to={'/dashboard/health'} className="backdrop"></Link>

            <dialog open>
                    <h2>Create your new Health track</h2>
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

export default HealthCreate;