import { mat4, vec3 } from "gl-matrix";
import { gl, initWebGLContext } from "./webgl-context.js";
import createProgram from "./shader-program.js";
import getSpriteInfo from "./get-sprite-info.js";
import loadTexture from "./load-texture.js";
import Sprite from "./sprite.js";

async function init() {
    if (!initWebGLContext("renderCanvas")) {
        return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0.02, 0.61, 0.85, 1);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const projMatrix = mat4.create();
    mat4.ortho(projMatrix, -64, 64, -64, 64, 1, -1);
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
    const projViewMatrix = mat4.create();
    mat4.mul(projViewMatrix, projMatrix, viewMatrix);

    const textureProgram = await createProgram("assets/shaders/",
        "texture.vert", "texture.frag");

    const texturePath = "assets/sprites/texture.png";
    const texture = await loadTexture(texturePath);
    const textureResponse = await fetch("assets/sprites/texture.json");
    const textureContent = await textureResponse.text();
    const atlasJson = JSON.parse(textureContent);
    const spriteNames = ["simple_level.png", "enemy_walk_1.png",
        "mario_dead.png", "coin.png", "mario_run_0.png"
    ];
    const spriteInfo = getSpriteInfo(atlasJson, spriteNames);
    const sprite = new Sprite(textureProgram, spriteNames, spriteInfo, texture);

    let currentTime, lastTime, dt;

    function render() {
        // requestAnimationFrame(render);
        gl.clear(gl.COLOR_BUFFER_BIT);

        sprite.setTextureRect("simple_level.png");
        sprite.setPosition(0, 0);
        sprite.draw(projViewMatrix);

        sprite.setTextureRect("enemy_walk_1.png");
        sprite.setPosition(16 * 1, -16 * 2 + 8);
        sprite.draw(projViewMatrix);

        sprite.setTextureRect("mario_dead.png");
        sprite.setPosition(0, 0);
        sprite.draw(projViewMatrix);

        sprite.setTextureRect("coin.png");
        sprite.setPosition(16 * 3 + 8, 16 * 1 + 8);
        sprite.draw(projViewMatrix);

        sprite.setTextureRect("mario_run_0.png");
        sprite.setPosition(16 * 2 + 8, 16 * 1 + 8);
        sprite.draw(projViewMatrix);
    }

    render();
}

init();
