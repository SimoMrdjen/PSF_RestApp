import React from "react";
import Kvartal from "./Kvartal";
import ObrazacIO from "./ObrazacIO";
import ZakljucniList from "./ZakljucniList";
import Obrazac5 from "./Obrazac5";
import StatusObr5 from "./StatusObr5";
import StatusObrIO from "./StatusObrIO";
import StatusZakList from "./StatusZakList";

function StornoAndStatusSection({
                                  selectedItemCancel,

                                  access_token,
                                  setSelectedItemCancel,
                                  selectedItemOveravanje,
                                  setSelectedItemOveravanje,
                                  selectedItemOdobravanje,
                                  setSelectedItemOdobravanje,
                                }) {
  return (
      <div style={{ padding: 24, minHeight: 380, background: "white" }}>
        <div className="container">
          <div className="form">
            <>
              {/* obrazacIO */}
              {(selectedItemCancel || selectedItemOdobravanje || selectedItemOveravanje) === "ObrazacIO" && (
                  <StatusObrIO
                      access_token={access_token}
                      selectedItemCancel={selectedItemCancel}
                      selectedItemOveravanje={selectedItemOveravanje}
                      setSelectedItemOveravanje={setSelectedItemOveravanje}
                      selectedItemOdobravanje={selectedItemOdobravanje}
                      setSelectedItemOdobravanje={setSelectedItemOdobravanje}
                  />
              )}

              {/* zakljucniList */}
              {(selectedItemCancel || selectedItemOdobravanje || selectedItemOveravanje) === "ZakljucniList" && (
                  <StatusZakList
                      access_token={access_token}
                      selectedItemCancel={selectedItemCancel}
                      selectedItemOveravanje={selectedItemOveravanje}
                      setSelectedItemOveravanje={setSelectedItemOveravanje}
                      selectedItemOdobravanje={selectedItemOdobravanje}
                      setSelectedItemOdobravanje={setSelectedItemOdobravanje}
                      setSelectedItemCancel={setSelectedItemCancel}

                  />
              )}

              {/* Obrazac5 */}
              {(selectedItemCancel || selectedItemOdobravanje || selectedItemOveravanje) === "Obrazac5" && (
                  <StatusObr5
                      access_token={access_token}
                      selectedItemCancel={selectedItemCancel}
                      selectedItemOveravanje={selectedItemOveravanje}
                      setSelectedItemOveravanje={setSelectedItemOveravanje}
                      selectedItemOdobravanje={selectedItemOdobravanje}
                      setSelectedItemOdobravanje={setSelectedItemOdobravanje}
                  />
              )}
            </>
          </div>
        </div>
      </div>
  );
}

export default StornoAndStatusSection;
