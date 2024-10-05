const { getBlockDescription } = require('./index');

describe('getBlockDescription', () => {
    
    it("can get description of block", async () => {
        const desc = await getBlockDescription("roboflow_core/roboflow_object_detection_model@v1");
        expect(desc).toEqual("Predict the location of objects with bounding boxes.");

        const desc2 = await getBlockDescription("roboflow_core/polygon_visualization@v1");
        expect(desc2).toEqual("Draws a polygon around detected objects in an image.");
    }, 10000);
});
