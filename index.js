const axios = require('axios');

// Function to fetch the manifest data
async function fetchManifest() {
    try {
        const response = await axios.get('https://detect.roboflow.com/workflows/blocks/describe');
        return response.data;  // Return the manifest data
    } catch (error) {
        console.error("Error fetching the manifest:", error);
        throw new Error("Error occurred while fetching manifest");
    }
}

// Function to get block description based on blockIdentifier
async function getBlockDescription(blockIdentifier) {
    try {
        const manifestData = await fetchManifest();  // Fetch the manifest

        // Look into the "blocks" array
        const blocks = manifestData.blocks;
        
        // Find the block with the matching blockIdentifier
        for (let block of blocks) {
            if (block.manifest_type_identifier === blockIdentifier) {
                // Return the human-readable description
                return block.block_schema.short_description || block.long_description || "Description not found";
            }
        }

        // If no block is found with the identifier, return "Block not found"
        return "Block not found";

    } catch (error) {
        console.error("Error processing block description:", error);
        return "Error occurred while processing block description";
    }
}

// Function to get input properties of a specific kind
async function getInputPropertiesOfKind(blockType, kind) {
    try {
        const manifestData = await fetchManifest();  // Fetch the manifest

        // Look into the "blocks" array
        const blocks = manifestData.blocks;
        
        // Find the block with the matching blockType
        const block = blocks.find(b => b.manifest_type_identifier === blockType);
        
        if (!block) {
            return "Block not found";
        }

        // Get the properties related to inputs
        const properties = block.block_schema.properties || {};

        // Collect property names whose 'kind' array contains the specified kind (e.g., "string")
        const matchingProperties = [];
        for (let propName in properties) {
            const prop = properties[propName];
            if (prop.anyOf) {
                // Check if the kind exists inside anyOf and matches the input kind
                for (let option of prop.anyOf) {
                    if (option.kind) {
                        const kinds = option.kind.map(k => k.name);
                        if (kinds.includes(kind)) {
                            matchingProperties.push(propName);
                        }
                    }
                }
            }
        }

        // Return the array of matching property names
        return matchingProperties.length ? matchingProperties : "No matching properties found";

    } catch (error) {
        console.error("Error processing input properties:", error);
        return "Error occurred while processing input properties";
    }
}

// Example usage for block description
// getBlockDescription("roboflow_core/roboflow_object_detection_model@v1")
//     .then(description => console.log(description))
//     .catch(error => console.error(error));

// // Example usage for input properties
// getInputPropertiesOfKind("roboflow_core/roboflow_object_detection_model@v1", "image")
//     .then(properties => console.log(properties))
//     .catch(error => console.error(error));

// getInputPropertiesOfKind("roboflow_core/polygon_visualization@v1", "string")
//     .then(properties => console.log(properties))
//     .catch(error => console.error(error));

// getInputPropertiesOfKind("roboflow_core/dynamic_crop@v1", "object_detection_prediction")
//     .then(properties => console.log(properties))
//     .catch(error => console.error(error));


module.exports = { getBlockDescription, getInputPropertiesOfKind }; 