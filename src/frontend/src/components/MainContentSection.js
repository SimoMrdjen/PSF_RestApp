import React from "react";
import Kvartal from "./Kvartal";
import ObrazacIO from "./ObrazacIO";
import ZakljucniList from "./ZakljucniList";
import Obrazac5 from "./Obrazac5";
import StornoAndStatusSection from "./StornoAndStatusSection";

function MainContentSection({
  kvartal,
  setKvartal,
  selectedItem,
  selectedItemCancel,
  selectedItemStatus,
  access_token,
  setSelectedItemCancel,
  setSelectedItemStatus,
}) {
  return (
    <>
      {selectedItem && (
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
                    <ObrazacIO
                      kvartal={kvartal}
                      setKvartal={setKvartal}
                      access_token={access_token}
                    />
                  )}

                  {/* zakljucniList */}
                  {selectedItem === "ZakljucniList" && (
                    <ZakljucniList
                      kvartal={kvartal}
                      setKvartal={setKvartal}
                      access_token={access_token}
                    />
                  )}

                  {/* Obrazac5 */}
                  {selectedItem === "Obrazac5" && (
                    <Obrazac5
                      kvartal={kvartal}
                      setKvartal={setKvartal}
                      access_token={access_token}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {(selectedItemCancel || selectedItemStatus) && (
        <StornoAndStatusSection
          selectedItem={selectedItem}
          selectedItemCancel={selectedItemCancel}
          selectedItemStatus={selectedItemStatus}
          setSelectedItemCancel={setSelectedItemCancel}
          setSelectedItemStatus={setSelectedItemStatus}
          access_token={access_token}
        />
      )}
    </>
  );
}

export default MainContentSection;
