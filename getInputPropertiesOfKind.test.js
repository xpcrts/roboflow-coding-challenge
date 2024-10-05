const axios = require('axios');
const { getInputPropertiesOfKind } = require('./index');

jest.mock('axios'); // Mock axios to avoid real HTTP requests

const mockManifest = {
    blocks: [
        {
            manifest_type_identifier: "roboflow_core/roboflow_object_detection_model@v1",
            block_schema: {
                properties: {
                    images: {
                        anyOf: [
                            {
                                kind: [
                                    { name: "image" }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        {
            manifest_type_identifier: "roboflow_core/polygon_visualization@v1",
            block_schema: {
                properties: {
                    color_axis: {
                        anyOf: [
                            {
                                kind: [
                                    { name: "string" }
                                ]
                            }
                        ]
                    },
                    color_palette: {
                        anyOf: [
                            {
                                kind: [
                                    { name: "string" }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        {
            manifest_type_identifier: "roboflow_core/dynamic_crop@v1",
            block_schema: {
                properties: {
                    predictions: {
                        anyOf: [
                            {
                                kind: [
                                    { name: "object_detection_prediction" }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    ]
};

describe('getInputPropertiesOfKind', () => {
    beforeEach(() => {
        // Mock axios to return the mockManifest when called
        axios.get.mockResolvedValue({ data: mockManifest });
    });

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
    });
});
