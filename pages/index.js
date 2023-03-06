import Loading from "@/components/Loading";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
    const [modal, setModal] = useState(false);
    const [thisDoctor, setThisDoctor] = useState(null);
    const router = useRouter();
    const fetchDoctors = async ({ pageParam = 1 }) => {
        const res = await fetch(
            "https://rickandmortyapi.com/api/character/?page=" + pageParam
        );
        return res.json();
    };

    const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
        queryKey: ["doctors"],
        queryFn: fetchDoctors,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.info.next) {
                return pages.length + 1;
            }
        },
    });

    if (status === "loading") return <Loading />;

    const fetchOneDoctor = async (id) => {
        const res = await fetch(
            "https://rickandmortyapi.com/api/character/" + id
        );
        return res.json();
    };

    const showThis = async (id) => {
        console.log(id);
        setModal(true);
        router.push({ hash: `${id}` }, undefined, { shallow: true });
        const thisDoctor = await fetchOneDoctor(id);
        setThisDoctor(thisDoctor);
    };

    const closeModal = () => {
        setModal(false);
        router.back();
        setThisDoctor(null);
    };

    return (
        <>
            {modal && (
                <div
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                        opacity: ".5",
                        zIndex: "10",
                    }}
                    onClick={closeModal}
                ></div>
            )}
            {modal && (
                <div
                    style={{
                        position: "fixed",
                        top: "50px",
                        height: "20rem",
                        width: "30rem",
                        backgroundColor: "yellow",
                        opacity: ".9",
                        zIndex: "20",
                    }}
                >
                    {!thisDoctor ? "Loading..." : <h3>{thisDoctor.name}</h3>}
                </div>
            )}
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
                                    {group.results.map((project, i) => (
                                        <div
                                            key={i}
                                            className="col-12 col-sm-12 col-md-6 my-3"
                                            onClick={() => showThis(project.id)}
                                        >
                                            <div className="card border-0 shadow text-center">
                                                <div className="card-body">
                                                    <div className="card-avatar">
                                                        <img
                                                            src={`${project.image}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h5 className="card-title text-dark">
                                                        {project.name +
                                                            " " +
                                                            project.species}
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
        </>
    );
};

export default Home;
