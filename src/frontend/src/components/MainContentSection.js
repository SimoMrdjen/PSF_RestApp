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
  setSelectedItem,
  selectedItemCancel,
  selectedItemStatus,
  access_token,
  setSelectedItemCancel,
  setSelectedItemStatus,
                              selectedItemOveravanje,
                              setSelectedItemOveravanje,
                              selectedItemOdobravanje,
                              setSelectedItemOdobravanje,
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

              { true
              //kvartal !== 0
              && (
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
                    //disabled={true}
                      kvartal={kvartal}
                      setKvartal={setKvartal}
                      access_token={access_token}
                      selectedItem={selectedItem}
                       setSelectedItem={setSelectedItem}
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

      {(selectedItemCancel || selectedItemOveravanje || setSelectedItemOdobravanje) && (
        <StornoAndStatusSection
            selectedItem={selectedItem}
            selectedItemCancel={selectedItemCancel}
            setSelectedItemCancel={setSelectedItemCancel}
            access_token={access_token}
            setSelectedItemOveravanje={setSelectedItemOveravanje}
            selectedItemOveravanje={selectedItemOveravanje}
            setSelectedItemOdobravanje={setSelectedItemOdobravanje}
            selectedItemOdobravanje={selectedItemOdobravanje}
        />
      )}
    </>
  );
}

export default MainContentSection;
