// Common Preview Code

// Post Processing
scene.clearColor = scene.clearColor.toLinearSpace(); // Fix for default rendering pipeline

 var defaultPipeline = new BABYLON.DefaultRenderingPipeline(
    "defaultPipeline", // The name of the pipeline
    true, // Do you want the pipeline to use HDR texture?
    scene, // The scene instance
    [scene.activeCamera] // The list of cameras to be attached to
);
//defaultPipeline.fxaaEnabled = true;
defaultPipeline.bloomEnabled = true;
defaultPipeline.imageProcessing.ditheringEnabled = true;

const ssr = new BABYLON.SSRRenderingPipeline("ssr", scene, [scene.activeCamera]);
ssr.thickness = 0.1;
ssr.selfCollisionNumSkip = 2;
ssr.enableAutomaticThicknessComputation = true;
ssr.blurDispersionStrength = 0.03;
ssr.roughnessFactor = 0.1;
ssr.maxSteps = 1200;

const ssao = new BABYLON.SSAO2RenderingPipeline("ssao2", scene, 1.0, [scene.activeCamera]);
ssao.samples = 24;
ssao.totalStrength = 0.8;
ssao.minZAspect = 0.3;
ssao.radius = 3.0;
ssao.epsilon = 0.05;
ssao.bilateralSamples = 12;
ssao.bilateralSoften = 0.1;
ssao.bilateralTolerance = 0.3;

const taaRenderPipeline = new BABYLON.TAARenderingPipeline("taa", scene, [scene.activeCamera]);
taaRenderPipeline.isEnabled = true;
taaRenderPipeline.samples = 8;

var ToggleWireFrame = function() {
    return scene.forceWireframe = !scene.forceWireframe;
};

var postProcessState = 0; // 0: Full post process, 1: No post process, 2: Unlit
var ChangePostProcess = function(newValue) {
    postProcessState = newValue;

    defaultPipeline.bloomEnabled = postProcessState == 0;
    ssr.isEnabled = postProcessState == 0;
    ssao.totalStrength = postProcessState == 0 ? 0.8 : 0.0;
    taaRenderPipeline.isEnabled = postProcessState == 0;
}

// UI
var uiCamera = new BABYLON.ArcRotateCamera("BGCamera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
uiCamera.layerMask = 0x10000000;
scene.activeCameras.push(scene.activeCamera);
scene.activeCameras.push(uiCamera);

const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
advancedTexture.layer.layerMask = 0x10000000;

const style = advancedTexture.createStyle();
style.fontSize = 18;
style.fontFamily = "Rubik";

var panel = new BABYLON.GUI.StackPanel();
panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
panel.left = "-60px";
//panel.isVisible = false;
advancedTexture.addControl(panel);

var CreateButton = function(buttonID, buttonText, buttonIcon, backgroundColor = "#000000CC") {
    var button = BABYLON.GUI.Button.CreateImageButton(buttonID, buttonText, buttonIcon);
    button.width = "10px";
    button.height = "40px";
    button.fixedRatio = 4;
    button.color = "white";
    button.style = style;
    button.background = backgroundColor;
    button.thickness = 0;
    button.cornerRadius = 8;
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

     return button;
};

var WireframeButton = CreateButton("wireframe", "Solid", "../assets/images/material_symbols/square.svg", "#000000CC");
WireframeButton.onPointerClickObservable.add(function () {
    var result = ToggleWireFrame();
    var buttonText = WireframeButton.children[0];
    buttonText.text = result ? "Wireframe" : "Solid"
    var buttonIcon = WireframeButton.children[1];
    buttonIcon.source = result ? "../assets/images/material_symbols/select.svg" : "../assets/images/material_symbols/square.svg";
});
panel.addControl(WireframeButton);

var PostProcessButton = CreateButton("wireframe", "Standard", "../assets/images/material_symbols/shadow_lined.svg", "#000000CC");
PostProcessButton.onPointerClickObservable.add(function () {
    ChangePostProcess((postProcessState + 1) % 3);
    var buttonText = PostProcessButton.children[0];
    var buttonIcon = PostProcessButton.children[1];
    
    switch (postProcessState) {
        case 0:
            buttonText.text = "Standard";
            buttonIcon.source = "../assets/images/material_symbols/shadow_lined.svg";
            break;
        case 1:
            buttonText.text = "No Post";
            buttonIcon.source = "../assets/images/material_symbols/shadow_fill.svg";
            break;
        case 2:
            buttonText.text = "Unlit";
            buttonIcon.source = "../assets/images/material_symbols/circle.svg";
            break;
        default:
            break;
    }
});
panel.addControl(PostProcessButton);

var SettingsButton = BABYLON.GUI.Button.CreateImageOnlyButton("settings", "../assets/images/material_symbols/settings.svg");
SettingsButton.width = "60px";
SettingsButton.height = "60px";
SettingsButton.color = "white";
SettingsButton.background = "#000000CC";
SettingsButton.thickness = 0;
SettingsButton.cornerRadius = 8;
SettingsButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
SettingsButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
SettingsButton.onPointerClickObservable.add(function () {
    panel.isVisible = !panel.isVisible;
    //SettingsButton.children[0].source = panel.isVisible ? "../assets/images/material_symbols/settings_fill.svg" : "../assets/images/material_symbols/settings.svg";
});
advancedTexture.addControl(SettingsButton);