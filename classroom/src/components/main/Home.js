import React from 'react';
import CreateClass from '../class/CreateClass';
import ClassCard from './ClassCard';
import Navbar from './Navbar';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row flex-wrap">
                    <div className={"col-lg-4 col-md-6 col-12"}>
                        <ClassCard
                            roomName={"Machine learning"}
                            ownerName={"Krish Goti"}
                            imgUrl={"../../img.jpg"}
                        />
                    </div>
                    <div className={"col-lg-4 col-md-6 col-12"}>
                        <ClassCard
                            roomName={"Machine learning"}
                            ownerName={"Krish Goti"}
                            imgUrl={"../../img.jpg"}
                        />
                    </div>
                    <div className={"col-lg-4 col-md-6 col-12"}>
                        <ClassCard
                            roomName={"Machine learning"}
                            ownerName={"Krish Goti"}
                            imgUrl={"../../img.jpg"}
                        />
                    </div>
                    <div className={"col-lg-4 col-md-6 col-12"}>
                        <ClassCard
                            roomName={"Machine learning"}
                            ownerName={"Krish Goti"}
                            imgUrl={"../../img.jpg"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
