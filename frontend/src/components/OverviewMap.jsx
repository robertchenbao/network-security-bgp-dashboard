import { GeoJsonLayer } from "@deck.gl/layers";
import usStatesGeoJson from "./us-states.json";
import { overviewViewState } from "./constants";
import DeckGLMap from "./DeckGLMap";

const getTooltip = ({ object }) => {
    if (!object) {
        return null;
    }
    const stateName = object.properties.name;
    const stateAbbr = object.properties.abbreviation;

    return `${stateName} (${stateAbbr.toUpperCase()})`;
};

const OverviewMap = ({ data, navigate }) => {
    const geoJsonLayer = new GeoJsonLayer({
        id: "geojson-layer",
        data: usStatesGeoJson,
        stroked: true,
        filled: true,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 50],
        getLineColor: [0, 0, 0, 255],
        pickable: true,
        onClick: ({ object, x, y }) => {
            if (object) {
                const stateAbbr = object.properties.abbreviation;
                navigate(`/${stateAbbr}`);
            }
        },
    });

    const layers = [geoJsonLayer];
    return (
        <DeckGLMap
            layers={layers}
            viewState={overviewViewState}
            getTooltip={getTooltip}
        />
    );
};
export default OverviewMap;
