// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());
// This attaches the camera to the canvas
camera.attachControl(canvas, true);

const environmentTexture = new BABYLON.CubeTexture("textures/skybox2", scene);
const skyboxMesh = scene.createDefaultSkybox(environmentTexture, true, 1000);
skyboxMesh.material.disableDepthWrite = true;

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Our built-in 'sphere' shape. Params: name, options, scene
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
// Our built-in 'ground' shape. Params: name, options, scene
var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

var material = new BABYLON.PBRMaterial("TheMaterial", scene);
material.roughness = 0.5;
sphere.material = material;
ground.setMaterialById("TheMaterial");

await BABYLON.appendSceneAsync("scenes/skull.babylon", scene);
var skull = scene.getMeshesById("test")[0];
skull.position = new BABYLON.Vector3(0, 1.5, 0);
skull.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);

var i = 0;
for (i = 0; i < 64; i++) {
    var skyscraper = BABYLON.MeshBuilder.CreateBox("skyscraper" + i, { width: 16, depth: 16, height: 128 });
    var randomDirection = new BABYLON.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2);
    randomDirection = randomDirection.normalize();
    randomDirection = randomDirection.multiplyByFloats((i + 4) * 4, (i + 4) * 4, (i + 4) * 8);
    randomDirection.y = i * 2;
    skyscraper.position = randomDirection;
}