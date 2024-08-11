import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import PieHome from "../components/pie_home";
import PlayerHome from "../components/player_home";
import ScorerHome from "../components/scorer_home"
import { Card } from "react-bootstrap";
import BowlerHome from "../components/bowler_home";
import TotalHome from "../components/total_home";

function Home() {
    return (
        <>
        <div className="coloring">
        <div className="full">
        <div className="container head">
            <h2 className="heads p-2">
                <strong>Cricket Tournament Dashboard</strong>
            </h2>
            <h3 className="text-center rounds">Cricket 2024 T20 Men's WorldCup Data</h3>
            
        </div>
        <div className="container mt-3 content p-5">
            <div className="row">
                <div className="col-md-4">
                    <Card bg="dark" className="size p-4">
                    <h3 className="text-center text-white"><strong>Toss Data</strong></h3>
                        <PieHome />
                    <p className="text-white p-2 text-center">This is a toss data, which shows how many times batting, bowling were opted in whole tournament.</p>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card bg="dark" className="size">
                    <h3 className="text-center text-white"><strong>Player of the Match</strong></h3>
                        <PlayerHome />
                    <p className="text-white p-2 text-center">This is a Player of the Match data, which shows how many times player were player of the match in whole tournament.</p>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card bg="dark" className="size">
                    <h3 className="text-center text-white"><strong>Top Player in Tournament</strong></h3>
                        <ScorerHome />
                    <p className="text-white p-2 text-center">This is a Player of the Match data, which shows how many times player were player of the match in whole tournament.</p>
                    </Card>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-6">
                    <Card bg="dark" className="make-center">
                    <h3 className="text-center text-white">
                        <strong>Top Bowler in Tournament</strong>
                    </h3>
                        <BowlerHome />
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card bg="dark" className="make-center">
                    <h3 className="text-center text-white">
                        <strong>Total Runs & Wickets</strong>
                    </h3>
                        <TotalHome />
                        <p className="text-white text-center">This is the data of total runs scored & total wickets taken in the tournament.</p>
                    </Card>
                </div>
            </div>
        </div>
        <div className="container">
        <div className="row">
            <div className="col-md-4">
            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus amet odit! Dolores sequi eos, soluta inventore rerum incidunt placeat mollitia libero, asperiores nihil sunt quis tenetur sit vero illum unde cumque modi distinctio esse porro ex quidem omnis. Numquam reprehenderit facilis incidunt omnis ab sunt reiciendis quas nostrum debitis.</p>
            </div>
            <div className="col-md-4">
                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. A suscipit earum obcaecati provident omnis dolores nostrum atque voluptatibus alias quasi at, quos nam minima ad adipisci accusantium explicabo dolore qui.</p>
            </div>
            <div className="col-md-4">
                <p className="text-white">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus reiciendis voluptatum deleniti blanditiis veniam laudantium iure quod adipisci quam ipsam eos, placeat voluptates quo at beatae explicabo a voluptatibus minima!
                </p>
            </div>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Home