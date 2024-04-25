import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CustomMarker from "components/map/CustomMarker";
import { Dataset, Point } from "data/data";
import { getBandwidthColoring, getResidualColoring } from "utilities";
import { ViewType } from "views/AGWR";

const Map = ({
  dataset,
  viewType,
}: {
  dataset: Dataset;
  viewType: ViewType;
}) => {
  const [activePoint, setActivePoint] = useState<Point | null>(null);
  const bandwidth = 102; // hard-coding for now

  let data: Point[] = dataset.data;
  switch (viewType) {
    case "residuals":
      data = getResidualColoring(dataset.data);
      break;
    case "correlations":
      break;
    case "bandwidths":
      if (activePoint)
        data = getBandwidthColoring(activePoint, dataset.data, bandwidth);
      break;
  }

  return (
    <MapContainer
      key={`${dataset.name}-${viewType}`}
      center={dataset.center}
      zoom={dataset.zoom}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {data.map((item, i) => {
        return (
          <CustomMarker
            key={i}
            data={item}
            onClick={() => setActivePoint(item)}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
