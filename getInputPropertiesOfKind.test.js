const axios = require('axios');
const { getInputPropertiesOfKind } = require('./index'); // Import the function to test

describe('getInputPropertiesOfKind', () => {

    it("can get input properties of a specified kind for a block type", async () => {
        const inputProps = await getInputPropertiesOfKind(
            "roboflow_core/roboflow_object_detection_model@v1",
            "image"
        );
        expect(inputProps).toEqual(["images"]);

        const inputProps2 = await getInputPropertiesOfKind(
            "roboflow_core/polygon_visualization@v1",
            "string"
        );
        expect(inputProps2).toEqual(["color_axis", "color_palette"]); 

        const inputProps3 = await getInputPropertiesOfKind(
            "roboflow_core/dynamic_crop@v1",
            "object_detection_prediction"
        );
        expect(inputProps3).toEqual(["predictions"]); 
    }, 10000); // Set timeout to 10000 ms (10 seconds)
});