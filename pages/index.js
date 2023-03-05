import Loading from "@/components/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
    const fetchDoctors = async ({ pageParam = 0 }) => {
        const res = await fetch(
            "https://www.tebinja.com/api/v1/doctors/searchi?page=" + pageParam
        );
        return res.json();
    };

    const { data, error, fetchNextPage, hasNextPage, status } =
        useInfiniteQuery({
            queryKey: ["doctors"],
            queryFn: fetchDoctors,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.success) {
                    return pages.length + 1;
                }
            },
        });

    if (status === "loading") return <Loading />;

    console.log(data.pages.length);

    return (
        <div className="container">
            <div className="row">
                {status === "success" && (
                    <InfiniteScroll
                        dataLength={data?.pages.length}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<Loading />}
                    >
                        {data.pages.map((group, i) => (
                            <React.Fragment key={i}>
                                {group.doctors.hits.map((project, i) => (
                                    <div
                                        key={i}
                                        className="col-12 col-sm-12 col-md-6 my-3"
                                    >
                                        <div className="card border-0 shadow text-center">
                                            <div className="card-body">
                                                <div className="card-avatar">
                                                    <img
                                                        src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${project._source.url}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <h5 className="card-title text-dark">
                                                    {project._source.fname +
                                                        " " +
                                                        project._source.lname}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );

    // return (
    //     <div className="container">
    //         <div className="row">
    //             {users.doctors.hits.map((item, i) => (
    //                 <div key={i} className="col-12 col-sm-12 col-md-6 my-3">
    //                     <div className="card border-0 shadow text-center">
    //                         <div
    //                             onClick={() => {
    //                                 setModal(true);
    //                                 setModalData(item);
    //                             }}
    //                             className="card-body"
    //                         >
    //                             <div className="card-avatar">
    //                                 <img
    //                                     src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
    //                                     onError={(e) => {
    //                                         e.currentTarget.src = icon;
    //                                     }}
    //                                     alt=""
    //                                 />
    //                             </div>
    //                             <h5 className="card-title text-dark">
    //                                 {item._source.fname +
    //                                     " " +
    //                                     item._source.lname}
    //                             </h5>
    //                             <button className="btn btn-sm btn-success badge">
    //                                 @{item._id}
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
};

export default Home;
