import { useQuery } from "@tanstack/react-query";
import React from "react";

const Doctors = () => {
    const { data } = useQuery({
        queryFn: () => blogComments(props.blog._id),
        queryKey: ["comments"],
    });

    return (
        <div className="container">
            <div className="row">
                {users.doctors.hits.map((item, i) => (
                    <div key={i} className="col-12 col-sm-12 col-md-6 my-3">
                        <div className="card border-0 shadow text-center">
                            <div
                                onClick={() => {
                                    setModal(true);
                                    setModalData(item);
                                }}
                                className="card-body"
                            >
                                <div className="card-avatar">
                                    <img
                                        src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
                                        onError={(e) => {
                                            e.currentTarget.src = icon;
                                        }}
                                        alt=""
                                    />
                                </div>
                                <h5 className="card-title text-dark">
                                    {item._source.fname +
                                        " " +
                                        item._source.lname}
                                </h5>
                                <button className="btn btn-sm btn-success badge">
                                    @{item._id}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;
