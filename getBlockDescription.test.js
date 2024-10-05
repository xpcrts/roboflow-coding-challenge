const axios = require('axios');
const { getBlockDescription } = require('./index');

// Mocking the axios library to avoid making an actual network request during tests
jest.mock('axios');

// Mock data for the manifest
const mockManifest = {
    blocks: [
        {
            manifest_type_identifier: "roboflow_core/roboflow_object_detection_model@v1",
            block_schema: {
                short_description: "Predict the location of objects with bounding boxes."
            }
        },
        {
            manifest_type_identifier: "roboflow_core/polygon_visualization@v1",
            block_schema: {
                short_description: "Draws a polygon around detected objects in an image."
            }
        }
    ]
};

describe('getBlockDescription', () => {
    it("can get description of block", async () => {
        // Mock axios to return the mockManifest instead of fetching from the actual URL
        axios.get.mockResolvedValue({ data: mockManifest });

        const desc = await getBlockDescription("roboflow_core/roboflow_object_detection_model@v1");
        expect(desc).toEqual("Predict the location of objects with bounding boxes.");

        const desc2 = await getBlockDescription("roboflow_core/polygon_visualization@v1");
        expect(desc2).toEqual("Draws a polygon around detected objects in an image.");
    });
});
