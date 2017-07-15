"use strict";
 
document.addEventListener("DOMContentLoaded", startGame, false);

var slider;

function valueChange(value) {
    console.log(value);

    slider = value;
}

/*

Bestimmen Sie den Wert des Gewichtes in der Datei
„index_flag.js“ und setzen ihn als Input zum
Shader analog zu analog zu analog zu „time“.
Definieren Sie dieses Gewicht ebenso als "uniform float “ im Fragment Shader .
 */



function startGame() {
    if (BABYLON.Engine.isSupported()) {
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, false);
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 4 , 20, BABYLON.Vector3.Zero(), scene);
 
        camera.attachControl(canvas);
 
        // Creating flag
        var flag = BABYLON.Mesh.CreateGround("Flag", 10, 10, 32, scene, true);
 
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

		var time = 1.0;

        flagMaterial.setFloat("time", 0.0);

        flag.material = flagMaterial;
 
        engine.runRenderLoop(function () {
            var shaderMaterial = scene.getMaterialByName("flag");
			shaderMaterial.setFloat("time", time);
			time += 0.1;
            scene.render();
        });
    }
};
