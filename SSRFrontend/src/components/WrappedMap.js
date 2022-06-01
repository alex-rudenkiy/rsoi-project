import React from "react";
import EditableOpenMap from "./Openmap";

export default function WrappedMap({ mapRef, ...props }) {
    return <EditableOpenMap  />;
}
