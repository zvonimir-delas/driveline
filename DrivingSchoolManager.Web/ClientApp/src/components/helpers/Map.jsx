import React from "react";
import { compose, withProps } from "recompose";
import {
  GoogleMap,
  Marker,
  Polyline,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import { googleMapsApiKey } from "../../constants/googleMapsApiKey.json";

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsApiKey}`,
    loadingElement: <div />,
    containerElement: <div />,
    mapElement: <div className="map" />,
  }),
  withScriptjs,
  withGoogleMap
)(
  ({
    mapRef,
    defaultCenter,
    markerPosition,
    draggable,
    coordinatesChangeHandler,
    path,
    isTracking,
  }) => (
    <GoogleMap
      ref={mapRef}
      defaultOptions={{
        disableDefaultUI: true,
        mapTypeId: "roadmap",
      }}
      defaultZoom={15}
      defaultCenter={{
        lat: defaultCenter.lat,
        lng: defaultCenter.lng,
      }}>
      {path && (
        <Polyline
          path={path.map((log) => ({
            lng: log.xCoordinate,
            lat: log.yCoordinate,
          }))}
          options={{ strokeColor: "#ff0000" }}
        />
      )}
      {markerPosition && (
        <Marker
          draggable={draggable}
          position={
            isTracking && path && path.length > 0
              ? {
                  lng: path[path.length - 1].xCoordinate,
                  lat: path[path.length - 1].yCoordinate,
                }
              : { lng: markerPosition.lng, lat: markerPosition.lat }
          }
          onDragEnd={(e) => coordinatesChangeHandler(e)}
        />
      )}
    </GoogleMap>
  )
);

export default Map;
