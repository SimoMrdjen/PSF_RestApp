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
  selectedItemStatus,
  access_token,
}) {
  return (
    <div style={{ padding: 24, minHeight: 380, background: "white" }}>
      <div className="container">
        <div className="form">
          <>
            {/* obrazacIO */}
            {(selectedItemCancel || selectedItemStatus) === "ObrazacIO" && (
              <StatusObrIO
                access_token={access_token}
                selectedItemCancel={selectedItemCancel}
                selectedItemStatus={selectedItemStatus}
              />
            )}

            {/* zakljucniList */}
            {(selectedItemCancel || selectedItemStatus) === "ZakljucniList" && (
              <StatusZakList
                access_token={access_token}
                selectedItemCancel={selectedItemCancel}
                selectedItemStatus={selectedItemStatus}
              />
            )}

            {/* Obrazac5 */}
            {(selectedItemCancel || selectedItemStatus) === "Obrazac5" && (
              <StatusObr5
                access_token={access_token}
                selectedItemCancel={selectedItemCancel}
                selectedItemStatus={selectedItemStatus}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default StornoAndStatusSection;
