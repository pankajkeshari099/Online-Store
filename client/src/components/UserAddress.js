import React from 'react';
import { useSelector } from 'react-redux';

const UserAddress = () => {
    const data = useSelector(state=> state.user.userDetails)
    return (
        <>
            <div className='row'>
                <div className="col-md-12" style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginLeft: "10px", borderRadius: "10px" }}>
                    <div className="row py-2">
                        <div className="col-md-9">
                            <p>Deliver To: {data?.address ? data?.address : 'NA'}</p>
                        </div>
                        <div className="offset-2 col-md-1 px-1">
                            <i className="fa-solid fa-pen-to-square hand edithover" title="Chnage Address"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserAddress