import React from "react";
import Kvartal from "./Kvartal";
import ObrazacIO from "./ObrazacIO";
import ZakljucniList from "./ZakljucniList";
import Obrazac5 from "./Obrazac5";

function MainContentSection({ kvartal, setKvartal, selectedItem, access_token }) {
    return (
        <>
            {selectedItem ? (
                <>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 380,
                            background: "white",
                        }}
                    >
                        <div className="container">
                            <div className="form">
                                <div style={{ marginTop: "15px" }}>
                                    <Kvartal kvartal={kvartal} setKvartal={setKvartal} />
                                    <br />
                                    <hr />
                                </div>

                                {kvartal !== 0 && (
                                    <>
                                        {/* obrazacIO */}
                                        {selectedItem === "ObrazacIO" && (
                                            <ObrazacIO kvartal={kvartal} setKvartal={setKvartal} access_token={access_token} />
                                        )}

                                        {/* zakljucniList */}
                                        {selectedItem === "ZakljucniList" && (
                                            <ZakljucniList kvartal={kvartal} setKvartal={setKvartal} access_token={access_token} />
                                        )}

                                        {/* Obrazac5 */}
                                        {selectedItem === "Obrazac5" && (
                                            <Obrazac5 kvartal={kvartal} setKvartal={setKvartal} access_token={access_token} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <br />
                    {/* Add your fallback content here if needed */}
                </>
            )}
        </>
    );
}

export default MainContentSection;
