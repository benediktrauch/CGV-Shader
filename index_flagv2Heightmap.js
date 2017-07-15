"use strict";
 
document.addEventListener("DOMContentLoaded", startGame, false);

var slider = 0.0;

function valueChange(value) {
    console.log(value);
    slider = value;
}

function getSlider() {
    return slider;
}

/*

Bestimmen Sie den Wert des Gewichtes in der Datei
„index_flag.js“ und setzen ihn als Input zum
Shader analog zu analog zu analog zu „time“.
Definieren Sie dieses Gewicht ebenso als "uniform float “ im Fragment Shader .
 */



function startGame(slider) {
    if (BABYLON.Engine.isSupported()) {

        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, false);
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 4 , 20, BABYLON.Vector3.Zero(), scene);

        camera.attachControl(canvas);

        // Light
        var spot = new BABYLON.PointLight("spot", new BABYLON.Vector3(0, 30, 10), scene);
        spot.diffuse = new BABYLON.Color3(1000, 1000, 1000);
        spot.specular = new BABYLON.Color3(10, 10, 10);
 
        // Creating flag
        //var flag = BABYLON.Mesh.CreateGround("Flag", 10, 10, 32, scene, true);
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false);

        var flagMaterial = new BABYLON.ShaderMaterial("flag", scene, {
            vertexElement: "vertexShaderCode",
            fragmentElement: "fragmentShaderCode"
            },
        {
            attributes: ["position", "normal", "uv", "slider"],
            uniforms: ["worldViewProjection", "world"],
        });
        flagMaterial.setTexture("textureSampler1", new BABYLON.Texture("earth.jpg", scene));
        flagMaterial.setTexture("textureSampler2", new BABYLON.Texture("moon.jpg", scene));
        flagMaterial.backFaceCulling = true;

		var time = 1.0;

        flagMaterial.setFloat("time", 0.0);
        flagMaterial.setFloat("textureValue", 0.0);

        ground.material = flagMaterial;

        //Sphere to see the light's position
        var sun = BABYLON.Mesh.CreateSphere("sun", 10, 4, scene);
        sun.material = new BABYLON.StandardMaterial("sun", scene);
        sun.material.emissiveColor = new BABYLON.Color3(10, 10, 0);

        //Sun animation
        scene.registerBeforeRender(function () {
            sun.position = spot.position;
            spot.position.x -= 0.5;
            if (spot.position.x < -90)
                spot.position.x = 100;
        });
 
        engine.runRenderLoop(function () {
            var slierValue = getSlider();
            var shaderMaterial = scene.getMaterialByName("flag");
			shaderMaterial.setFloat("time", time);
			shaderMaterial.setFloat("textureValue", slierValue);
			time += 0.1;
            scene.render();
        });
    }
};
